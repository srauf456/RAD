import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { fileURLToPath } from 'url'
// https://vite.dev/config/

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
   resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
   build: {
    chunkSizeWarningLimit: 2000, // increase warning limit (2MB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // all node_modules into vendor.js
          }
        },
      },
    },
  },
})