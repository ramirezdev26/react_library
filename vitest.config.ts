import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const config = {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    globals: true,
    types: ['vitest/globals'],
  },
};

export default defineConfig(config);
