const http = require('http');
const { getProducts, getProduct } = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') { 
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/[0-9]+/) && req.method === 'GET') { 
    // the url is /api/products/number
    // so in order to get the id, we split the string by the '/'
    // that will return the array ['', 'api', 'products', 'number']
    // so then we grab just the number which is in the 3rd position of the array
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/html" });
    res.end(JSON.stringify({ message: "404 Not Found" }));
  }
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=> console.log(`running on port ${PORT}`))
