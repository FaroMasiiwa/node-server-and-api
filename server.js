//Import http, file and path modules.
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

//Define port to listen for server requests.
const PORT = process.env.PORT || 3000;


//Define directory where static files are located
const publicDir = path.join(__dirname, 'public');



//Define server
const server = http.createServer((req, res) => {
    console.log(`Request received for: ${req.url}`);

   let requestPath = req.url;
   
   if (requestPath === '/') {
    requestPath = '/index.html';
    }


    const filePath = path.join(publicDir, requestPath);
    

    // Check if the requested path ends with '.html'
    if (path.extname(filePath) === '.html') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error reading file: ${filePath}`, err);

                const notFoundPath = path.join(publicDir, '404.html');
                fs.readFile(notFoundPath, (notFoundErr, notFoundData) => {
                    if (notFoundErr) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('500 Internal Server Error: 404 page not found.');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(notFoundData);
                    }
                });
            } else {
                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        
        const notFoundPath = path.join(publicDir, '404.html');
        fs.readFile(notFoundPath, (notFoundErr, notFoundData) => {
            if (notFoundErr) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error: 404 page not found.');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(notFoundData);
            }
        });
    }
});

// Start the server and listen on the specified port.
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open http://localhost:${PORT}/index.html.`);
});


