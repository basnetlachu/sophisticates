import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Warn when chunks exceed 500KB
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cached chunks
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable source maps for production debugging (disable for smallest bundle)
    sourcemap: false,
    // Minify with esbuild (fast and effective)
    minify: 'esbuild',
  },
})
