const fs = require('fs');
const path = require('path');

function serveFile(filePath, contentType, res, statusCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('File read error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

module.exports = serveFile;
