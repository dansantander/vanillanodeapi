const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // response.setHeader() allows you only to set a singular header.
  // response.writeHead() will allow you to set pretty much everything about the response head including status code, content, and multiple headers.
  res.setHeader('Content-Type', 'text/html');
  // we can use html tags because our content type is set to text/html
  res.write('<h1> Hello world </h1>');
  res.end();
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log(`running on port ${PORT}`))