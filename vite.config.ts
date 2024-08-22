import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      'ethers': path.resolve(__dirname, 'node_modules/ethers')
    }
  },
  optimizeDeps: {
    force: true
  },
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
});
