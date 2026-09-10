import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/team-project-frontend/',
  plugins: [react()],
  server: {
    port: 5173,
    // Requests to /api are forwarded to the backend, so no CORS setup is
    // needed during local development.
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
