import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { lossless: true },
    }),
    viteCompression({
      algorithm: 'brotli',
      ext: '.br'
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    minify: true,
    rollupOptions: {
      external: [
        // Exclude platform-specific optional dependencies
        /@rollup\/rollup-win32-x64-msvc/,
        /@rollup\/rollup-darwin-x64/,
        /@rollup\/rollup-linux-x64-gnu/
      ],
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'ui-core': ['@radix-ui/react-tooltip', 'lucide-react'],
          'utils': ['clsx', 'tailwind-merge']
        }
      },
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@radix-ui/react-tooltip', 'lucide-react'],
    exclude: ['@rollup/rollup-win32-x64-msvc', '@rollup/rollup-darwin-x64', '@rollup/rollup-linux-x64-gnu']
  }
}));