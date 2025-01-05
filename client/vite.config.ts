import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/

export default defineConfig({

  server: {
    host: '0.0.0.0', // Allow access from outside the container
    port: 5173,      // Ensure the port matches the one exposed in Docker
    strictPort: true, // Ensure Vite fails if the port is in use
  },
  plugins: [react() ,svgr()],
  resolve: {
    alias: {
      '@': '/src', 
    },
  },
})
