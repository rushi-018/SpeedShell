import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // ✅ makes assets load relative to index.html
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173,
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./style.scss";`
      }
    }
  }
}); 