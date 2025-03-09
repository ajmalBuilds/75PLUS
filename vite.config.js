import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    // Ensure the app supports client-side routing (for React Router)
    historyFallback: true, // Correct Vite option
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
