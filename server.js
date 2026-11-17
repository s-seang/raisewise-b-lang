/* Minimal zero-dependency static server so the site runs as a Render Web Service.
   Render provides PORT; locally it falls back to 3000. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.normalize(path.join(ROOT, rel));
  // Only serve the site's own files (no server code, no dotfiles, no path escape).
  const blocked = !file.startsWith(ROOT + path.sep) || /(^|[\\/])\./.test(path.relative(ROOT, file))
    || ['server.js', 'package.json', 'render.yaml'].includes(path.relative(ROOT, file));
  if (blocked) { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(file, (err, data) => {
    if (err) {
      // Unknown paths fall back to the app (it uses hash routing).
      return fs.readFile(path.join(ROOT, 'index.html'), (e, html) => {
        if (e) { res.writeHead(500); return res.end('Server error'); }
        res.writeHead(200, { 'Content-Type': TYPES['.html'] }); res.end(html);
      });
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`RaiseWise running on port ${PORT}`));
