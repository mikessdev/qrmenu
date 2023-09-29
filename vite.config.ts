import { fileURLToPath, URL } from 'node:url';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'happy-dom'
  }
};

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/scss/app.scss";`
      }
    }
  },
  test: vitestConfig.test
});
