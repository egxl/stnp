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
    cssChunking: 'loose',
  },
  images: {
    remotePatterns: [
      {
        // Current live WP host — keep until DNS migration is complete
        protocol: 'https',
        hostname: 'stnp.co.id',
        pathname: '/wp-content/**',
      },
      {
        // Headless CMS subdomain (active after DirectAdmin migration)
        protocol: 'https',
        hostname: 'cms.stnp.co.id',
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
