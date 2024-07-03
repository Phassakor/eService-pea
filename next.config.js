/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/core"],
  },
  typescript: {
    // Ignore errors during build process
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
