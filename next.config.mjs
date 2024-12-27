/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    scrollRestoration: true, // Retains scroll position between navigations
    externalDir: true, // Allows accessing files outside the root directory
  },
  //   reactStrictMode: true,      // Enforces React best practices
  // Enforces React best practices

  // webpack: (config, { isServer }) => {
  //     if (!isServer) {
  //       config.resolve.fallback = {
  //         fs: false,
  //         net: false,
  //         tls: false,
  //         dgram: false,
  //         child_process: false, // Add other Node.js modules as needed
  //       };
  //     }
  //     return config;
  //   }
};

export default nextConfig;
