const fs = require('fs')
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

  console.log(req.url);
  console.log(' = = = = = = = = = = = = = = ');

  res.statusCode = 200;

  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello World');

  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('public/index.html').pipe(res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// 'use strict';

// const express = require('express');

// // Constants
// const PORT = 3000;
// const HOST = '0.0.0.0';

// // App
// const app = express();
// app.get('/', (req, res) => {
// 	res.send('Hello remote world!\n');
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

