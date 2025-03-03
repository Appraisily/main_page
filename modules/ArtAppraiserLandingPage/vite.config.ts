import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { splitVendorChunkPlugin } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-transform-remove-console', { exclude: ['error', 'warn'] }]
        ]
      }
    }),
    splitVendorChunkPlugin()
  ],
  build: {
    cssCodeSplit: false,
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react'],
          'critical': [
            './src/components/HeroSplitScreen.tsx',
            './src/components/Logo.tsx'
          ],
          'deferred': [
            './src/components/TrustFooter.tsx',
            './src/components/ExpertProfile.tsx'
          ]
        }
      }
    },
    assetsInlineLimit: 0
  },
  optimizeDeps: {
    include: ['react', 'react-dom/client', 'lucide-react', 'react-router-dom'],
    exclude: []
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
});