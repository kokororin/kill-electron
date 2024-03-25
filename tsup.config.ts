import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/kill-electron.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  clean: true,
  dts: true,
  shims: true
});
