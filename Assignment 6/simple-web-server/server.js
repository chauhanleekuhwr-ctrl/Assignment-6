// server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const serveFile = (res, filePath, contentType, statusCode = 200) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
            return;
        }
        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(data);
    });
};

http.createServer((req, res) => {
    const url = req.url === '/' ? '/home' : req.url;

    const routes = {
        '/home': ['home.html', 'text/html'],
        '/about': ['about.html', 'text/html'],
        '/contact': ['contact.html', 'text/html'],
        '/styles.css': ['styles.css', 'text/css']
    };

    const file = routes[url];
    if (file) {
        serveFile(res, path.join(__dirname, 'public', file[0]), file[1]);
    } else {
        serveFile(res, path.join(__dirname, 'public', '404.html'), 'text/html', 404);
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
