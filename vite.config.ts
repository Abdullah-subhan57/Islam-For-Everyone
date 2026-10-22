import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const disableHmr =
  (globalThis as typeof globalThis & {process?: {env?: Record<string, string | undefined>}})
    .process?.env?.DISABLE_HMR === 'true';
const assistantApiPort =
  (globalThis as typeof globalThis & {process?: {env?: Record<string, string | undefined>}})
    .process?.env?.ASSISTANT_API_PORT || '3001';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: !disableHmr,
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: disableHmr ? null : {},
      proxy: {
        '/api/assistant': {
          target: `http://127.0.0.1:${assistantApiPort}`,
          changeOrigin: true
        }
      }
    },
  };
});
