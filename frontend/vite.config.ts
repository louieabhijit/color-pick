import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
    postcss: './postcss.config.js'
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'react-icons'],
          utils: ['culori', 'colorthief', 'color-name-list', 'nearest-color']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    assetsDir: 'assets',
    copyPublicDir: true
  },
  optimizeDeps: {
    include: ['colorthief', 'color-name-list', 'nearest-color']
  },
  publicDir: 'public'
})
