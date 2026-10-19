import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Turbopack's filesystem cache is slow on network drives. Set NEXT_DISABLE_FS_CACHE=1 to skip it.
const fsCache = process.env.NEXT_DISABLE_FS_CACHE !== "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    turbopackFileSystemCacheForDev: fsCache,
    turbopackFileSystemCacheForBuild: fsCache,
    // Optional: limit build workers on memory-constrained machines (e.g. NEXT_BUILD_CPUS=1)
    ...(process.env.NEXT_BUILD_CPUS ? { cpus: Number(process.env.NEXT_BUILD_CPUS) } : {}),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
