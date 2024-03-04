/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb)$/i,
      use: [
        {
          loader: "file-loader",
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
