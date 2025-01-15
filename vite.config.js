import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
        "/socket.io": {
          target: "http://localhost:3000",
          //target:"https://chat-app-server-virid.vercel.app",
          changeOrigin: true,
          ws: true, // Enable WebSocket proxying
        },
    },
  },
})
