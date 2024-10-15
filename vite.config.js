import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@config': path.resolve(__dirname, '@config'),
      '@component': path.resolve(__dirname, 'src/component'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
});
