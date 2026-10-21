import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative assets work on both / and /React-Midterm-Project/ GitHub Pages URLs.
  base: "./",
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    restoreMocks: true,
  },
});
