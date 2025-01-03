import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/time-spend/",
  plugins: [
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src/service-worker",
      filename: "sw.ts",
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        theme_color: "#000000",
        background_color: "#ffffff",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshots/1.png",
            sizes: "1290x2796",
            type: "image/png",
          },
          {
            src: "/screenshots/2.png",
            sizes: "1290x2796",
            type: "image/png",
          },
          {
            src: "/screenshots/3.png",
            sizes: "1290x2796",
            type: "image/png",
          },
        ],
        orientation: "portrait",
        display: "standalone",
        lang: "fr",
        name: "time | $pend",
        short_name: "time | $pend",
        id: "/time-spend/",
        start_url: "/time-spend/",
        scope: "/time-spend/",
        description: "L'app qui vous rappelle que le temps c'est de l'argent",
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
