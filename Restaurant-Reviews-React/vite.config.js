import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    port: 3000,
    proxy: {
      '/api':{
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()]
})
