const CACHE_VERSION = "v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_VERSION);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  if (response.status >= 400 ||
      !/wasm$|onnx$/.test(request.url)) {
    return;
  }
  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    console.log('using cache');
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.log('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  const responseFromNetwork = await fetch(request.clone());
  // response may be used only once
  // we need to save clone to put one copy in cache
  // and serve second one
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(Promise.all([
    addResourcesToCache([
      '/FTransGAN.onnx',
    ]),
    self.skipWaiting(),
  ]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    enableNavigationPreload(),
    self.clients.claim(),
  ]));
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
    })
  );
});
