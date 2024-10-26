import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true, // Set to true for a 308 redirect, which is permanent
          },
        ];
      },
    images: {
        domains: ["avatar.iran.liara.run"],
    },
};

export default nextConfig;
