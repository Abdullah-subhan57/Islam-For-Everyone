import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nodeModules = path.join(projectRoot, 'node_modules');
const appPort = process.env.APP_PORT || '3000';
const processes = [
  {
    name: 'assistant API',
    entry: path.join(nodeModules, 'tsx', 'dist', 'cli.mjs'),
    args: ['watch', 'server/dev.ts']
  },
  {
    name: 'Vite',
    entry: path.join(nodeModules, 'vite', 'bin', 'vite.js'),
    args: [`--port=${appPort}`, '--host=0.0.0.0', '--strictPort']
  }
].map(({ name, entry, args }) => {
  const child = spawn(process.execPath, [entry, ...args], {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  child.on('error', (error) => {
    console.error(`Unable to start ${name}:`, error);
    process.exitCode = 1;
    shutdown('SIGTERM');
  });
  return child;
});

let isShuttingDown = false;

function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  for (const child of processes) {
    if (child.exitCode === null && !child.killed) child.kill(signal);
  }
}

for (const child of processes) {
  child.on('exit', (code) => {
    if (!isShuttingDown) {
      process.exitCode = code ?? 1;
      shutdown('SIGTERM');
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
