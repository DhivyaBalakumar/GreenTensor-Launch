import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/__tests__/setup.ts"],
    pool: "forks",
    testTimeout: 15000,
    hookTimeout: 10000,
    coverage: {
      provider: "v8",
      thresholds: {
        lines: 80,
        branches: 80,
      },
      include: ["src/lib/**/*.ts"],
      exclude: ["src/__tests__/**", "node_modules/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
