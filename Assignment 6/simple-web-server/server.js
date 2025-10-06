const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');
const serveFile = require('./utils/serveFile');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const { url, method } = req;

    // Log each request
    console.log(`${method} ${url}`);

    // Serve static CSS file
    if (url === '/styles.css') {
        const cssPath = path.join(__dirname, 'public', 'styles.css');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        return fs.createReadStream(cssPath).pipe(res);
    }

    // Handle defined routes
    if (routes[url]) {
        return serveFile(path.join(__dirname, 'public', routes[url]), 'text/html', res);
    }

    // Handle 404 - Not Found
    serveFile(path.join(__dirname, 'public', '404.html'), 'text/html', res, 404);
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

