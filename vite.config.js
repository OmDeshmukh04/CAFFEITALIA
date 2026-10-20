import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(process.cwd(), 'index.html'),
        menu: resolve(process.cwd(), 'menu/index.html'),
        story: resolve(process.cwd(), 'story/index.html'),
        gatherings: resolve(process.cwd(), 'gatherings/index.html'),
        visit: resolve(process.cwd(), 'visit/index.html')
      }
    }
  }
});
