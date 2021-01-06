// SERVER FIRST VERSION
//    Rendering products within this same file
//    Getting products directly from data/products.json
//    Not making use of any asynchronous functions

const http = require('http');
const products = require('./data/products.json')

// *** setting up server using writeHead
// response.writeHead() will allow you to set pretty much everything about the response head
// including status code, content, and multiple headers.

const server = http.createServer((req, res) => {
  // we only want to render products if we hit '/api/products' as the route
  // and if the request method is GET
  if (req.url === '/api/products' && req.method === 'GET') { 
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(products)); // Express returns JSON automatically, so this won't be needed
    res.end(); // these two lines can be shortened as: res.end(JSON.stringify(products))
  } else {
    res.writeHead(404, { "Content-Type": "application/html" });
    res.end(JSON.stringify({ message: "404 Not Found" }));
  }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log(`running on port ${PORT}`))

// *** setting up server using setHeader
// response.setHeader() allows you only to set a singular header.

/* const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // we can use html tags because our content type is set to text/html
  res.write('<h1> Hello world </h1>');
  res.end();
}) */
