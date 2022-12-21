const CACHE_VERSION = "v1";

const putInCache = async (request, response) => {
  if (response.status >= 400 ||
      !/wasm$|onnx$/.test(request.url)) {
    return;
  }
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response);
};

const cacheFirst = async ({ request }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('using cache for',request.url);
    return responseFromCache;
  }

  // Next try to get the resource from the network
  const responseFromNetwork = await fetch(request.clone());
  // response may be used only once
  // we need to save clone to put one copy in cache
  // and serve second one
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener('install', (event) => {
  const addResourcesToCache = async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll([
      '/FTransGAN.onnx',
    ]);
  };
  event.waitUntil(Promise.all([
    addResourcesToCache(),
    self.skipWaiting(),
  ]));
});

self.addEventListener('activate', (event) => {
  const deleteOldCaches = async () => {
    const cacheKeepList = [CACHE_VERSION];
    const keyList = await caches.keys();
    const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
    await Promise.all(cachesToDelete.map(async (key) => caches.delete(key)));
  };
  event.waitUntil(Promise.all([
    deleteOldCaches(),
    self.clients.claim(),
  ]));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({ request: event.request })
  );
});
