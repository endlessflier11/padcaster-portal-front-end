module.exports = {
  reactStrictMode: true,
  images: {
    loader: "custom",
    path: "/images/",
  },
  env: {
    API_URL: process.env.API_URL,
    TEST_API_URL: process.env.TEST_API_URL,
    MEDIA_URL: process.env.MEDIA_URL,
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  async rewrites() {
    return [
      {
        source: '/api/v0/:path*',
        destination: `${process.env.TEST_API_URL}/:path*` // Proxy to Backend
      }
    ]
  }
};
