const http = require('http');
const { getProducts } = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') { 
    getProducts(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/html" });
    res.end(JSON.stringify({ message: "404 Not Found" }));
  }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log(`running on port ${PORT}`))
