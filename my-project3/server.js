const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const TABI_KEY = 'sk-R7hYNYsSrR4F8uyS1qXh4ZZ2Cvzqdu5YhzedVMP6hQNQay33';
const TABI_URL = 'https://tabitoken.com/v1/chat/completions';

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // API proxy
  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const resp = await fetch(TABI_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + TABI_KEY
          },
          body: body,
          signal: AbortSignal.timeout(60000)
        });
        const data = await resp.text();
        // If upstream returns non-JSON (e.g. HTML error page), return friendly error
        let json;
        try { json = JSON.parse(data); } catch(e) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: { message: 'AI service returned an invalid response. Try again.', type: 'upstream_error' } }));
          return;
        }
        res.writeHead(resp.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(json));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('edittt running at http://localhost:' + PORT);
});
