/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/1st',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
