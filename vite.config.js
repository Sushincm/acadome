import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Vite 8 (Rolldown) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router') || id.includes('react-helmet')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap')) return 'vendor-gsap';
          if (id.includes('node_modules/swiper')) return 'vendor-swiper';
          if (id.includes('node_modules/lenis')) return 'vendor-lenis';
          if (id.includes('node_modules/glightbox')) return 'vendor-glightbox';
          if (id.includes('node_modules/react-icons')) return 'vendor-icons';
        }
      }
    }
  }
})
