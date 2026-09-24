import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos are self-hosted WebP files in public/images (see the optimize-image skill).
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
};

export default nextConfig;
