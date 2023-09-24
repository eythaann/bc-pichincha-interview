import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../dist')));

export let clients = [];

if (process.argv.includes('--dev')) {
  app.get('/events', (req, res) => {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
    });
    res.flushHeaders();

    clients.push(res);

    req.on('close', () => {
      clients = clients.filter((client) => client !== res);
    });

    req.on('error', (error) => {
      if (error.code === 'ECONNRESET') {
        clients = clients.filter((client) => client !== res);
      }
    });
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT);