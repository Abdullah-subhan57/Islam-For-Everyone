import 'dotenv/config';
import express from 'express';
import { assistantRouter } from './assistantApi';

const app = express();
const port = Number(process.env.ASSISTANT_API_PORT) || 3001;

app.disable('x-powered-by');
app.use('/api/assistant', assistantRouter);
app.listen(port, '127.0.0.1', () => {
  console.info(`AI assistant API listening on port ${port}.`);
});
