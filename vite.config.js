import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/front_7th_chapter2-1/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    exclude: ['**/e2e/**', '**/*.e2e.spec.js', '**/node_modules/**'],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});
