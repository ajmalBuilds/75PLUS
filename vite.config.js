import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true, // Ensures client-side routing works in dev mode
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});