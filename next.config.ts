import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sparklit-assets.s3.ap-southeast-1.amazonaws.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
