/// <reference types="vitest" />
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.svg", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "ChatAppPWA",
        short_name: "ChatAppPWA",
        description: "Chat App as PWA",
        theme_color: "#111113",
        icons: [
          {
            src: "favicon.svg",
            sizes: "192x192",
          },
          {
            src: "mask-color.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  test: {
    include: ["**/*.test.*"],
    globals: true,
    browser: {
      enabled: true,
      name: "chrome",
    },
  },
});
