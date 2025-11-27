import type { NextConfig } from "next";
import { i18n } from "./i18n-config";

const nextConfig: NextConfig = {
  i18n: {
    locales: i18n.locales,
    defaultLocale: i18n.defaultLocale,
    localeDetection: false,
  },
  experimental: {
    // @ts-ignore - cacheComponents is available in Next.js 15+ (canary/rc) or 16
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
