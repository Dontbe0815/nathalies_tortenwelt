import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Entferne standalone output für Vercel
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Wichtig für Vercel: Bilder von externen Quellen erlauben
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
};

export default nextConfig;
