/** @type {import('next').NextConfig} */
import NextFederationPlugin from "@module-federation/nextjs-mf";

const exposes = {
  "./Transfer": "./pages/index.tsx",
  "./AddTransferFess": "./pages/transfer-fees/add.tsx",
  "./AddTransferRecords": "./pages/transfer-records/add.tsx",
  "./ViewTransferRecords": "./pages/transfer-records/view.tsx",
  "./pages-map": "./pages-map.ts",
};
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer, dev }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    if (!dev) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "retail",
          filename: "static/chunks/remoteEntry.js",
          exposes,
          shared: {
            sonner: {
              requiredVersion: "^2.0.0",
              singleton: true,
            },
          },
          extraOptions: {
            debug: true,
            exposePages: true,
            enableImageLoaderFix: true,
            enableUrlLoaderFix: true,
          },
        }),
      );
    }

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
