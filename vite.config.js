import { fileURLToPath, URL } from "url";

// A Simple way to import SVG into the template with vite
import svgLoader from "vite-svg-loader";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
