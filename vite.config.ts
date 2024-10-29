import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/mytheresa-movies/" : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/settings/index" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
}));
