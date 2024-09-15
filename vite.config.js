import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true
    })
  ],
  server: {
    port: 5173,
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], 
      allowedHeaders: ['Authorization', 'Content-Type'], 
      credentials: true, 
      maxAge: 3600 
    },
    proxy: {
      '/api': {
        target: 'http://ec2-52-78-189-146.ap-northeast-2.compute.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
      }
    }
  },
});
