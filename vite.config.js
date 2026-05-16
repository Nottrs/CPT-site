import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/quote-api': {
        target: 'https://api.quotable.io',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/quote-api/, ''),
      },
    },
  },
})
