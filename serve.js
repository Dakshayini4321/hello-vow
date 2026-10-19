import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  html: 'text/html; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  svg: 'image/svg+xml',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  gif: 'image/gif',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  woff: 'font/woff',
  woff2: 'font/woff2',
  ttf: 'font/ttf',
};

const server = http.createServer((req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname);
  let filepath = path.join(__dirname, pathname);

  if (fs.existsSync(filepath) && fs.statSync(filepath).isDirectory()) {
    filepath = path.join(filepath, 'index.html');
  }

  if (!fs.existsSync(filepath)) {
    filepath = path.join(__dirname, 'index.html');
  }

  const ext = path.extname(filepath).slice(1).toLowerCase();
  res.writeHead(200, {
    'content-type': MIME[ext] || 'application/octet-stream',
    'access-control-allow-origin': '*',
  });
  fs.createReadStream(filepath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Wedding invitation running at http://localhost:${PORT}`);
});
