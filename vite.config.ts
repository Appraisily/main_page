import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Simplified Babel config to avoid duplicates
      babel: {
        plugins: [
          mode === 'production' && 'babel-plugin-transform-remove-prop-types',
        ].filter(Boolean),
      },
      // Fast refresh only in development
      fastRefresh: mode !== 'production',
    }),
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
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'ui-core': ['@radix-ui/react-tooltip', 'lucide-react'],
          'utils': ['clsx', 'tailwind-merge'],
          'analytics': ['./src/lib/analytics']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      },
      plugins: [terser()]
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@radix-ui/react-tooltip', 'lucide-react'],
    exclude: ['@analytics/google-analytics']
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
}));