import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/dashboard',
            permanent: true,
          },
        ];
      },
    images: {
        domains: ["avatar.iran.liara.run"],
    },
};

export default nextConfig;
