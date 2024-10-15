import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

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
    proxy: {
      '/proxy': {
        target: 'https://api.telegro.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''),
        secure: false,
        ws: true,
      }
    },
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], 
      allowedHeaders: ['Authorization', 'Content-Type'], 
      credentials: true, 
      maxAge: 3600 
    },
  },
});