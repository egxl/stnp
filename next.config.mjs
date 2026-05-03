/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Canonical migration: /about-us → /about (301 permanent)
      { source: '/:lang/about-us', destination: '/:lang/about', permanent: true },
    ];
  },
  experimental: {
    viewTransition: true,
    cssChunking: 'strict',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stnp.co.id',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
  },
};

export default nextConfig;
