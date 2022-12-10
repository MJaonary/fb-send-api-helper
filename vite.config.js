import { fileURLToPath, URL } from "url";

// A Simple way to import SVG into the template with vite
import svgLoader from "vite-svg-loader";

// Automatic https Certificate Generation
import basicSsl from "@vitejs/plugin-basic-ssl";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [vue(), svgLoader(), basicSsl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
