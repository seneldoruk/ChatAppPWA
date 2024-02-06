/// <reference types="vitest" />
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "ChatAppPWA",
        short_name: "ChatAppPWA",
        description: "Chat App as PWA",
        theme_color: "#111113",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon.png",
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
});
