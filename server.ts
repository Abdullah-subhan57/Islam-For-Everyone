import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assistantRouter } from './server/assistantApi';

const app = express();
const projectDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.join(projectDirectory, 'dist');
const port = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');
app.use('/api/assistant', assistantRouter);
app.use(express.static(distDirectory));
app.get('*', (_request, response) => {
  response.sendFile(path.join(distDirectory, 'index.html'));
});

app.listen(port, () => {
  console.info(`Islam for Everyone server listening on port ${port}.`);
});
