/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/config/tests/setup.ts",
    include: [
      "**/__tests__/**/*.test.[jt]s?(x)",
      "**/?(*.){test,spec}.[jt]s?(x)",
    ],
    css: true,
  },
});
