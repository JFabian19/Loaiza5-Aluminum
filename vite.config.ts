import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    build: {
      target: 'es2015',
      // Better code splitting for smaller initial bundle
      rollupOptions: {
        output: {
          manualChunks: {
            // Separate vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'router': ['react-router-dom'],
            'icons': ['lucide-react'],
          },
        },
      },
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Smaller chunk size warnings
      chunkSizeWarningLimit: 50,
      // Minify with terser for smaller output
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
