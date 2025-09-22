import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { envOnlyMacros } from 'vite-env-only';
import { vercelPreset } from '@vercel/react-router/vite';

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test' || !!process.env.VITEST;

  return {
    base: '/',
    build: {
      outDir: 'dist',
    },
    plugins: [
      !isTest && reactRouter(),
      tailwindcss(),
      envOnlyMacros(),
      vercelPreset(),
    ],
    define: {
      global: 'globalThis',
      'process.env': {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    ssr: {
      noExternal: true,
    },
  };
});
