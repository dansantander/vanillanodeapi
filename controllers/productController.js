const Product = require('../models/productModel');

// @desc    Gets ALL Products
// @route   GET   /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    // console.log(typeof (products)) => object
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(products)); // this way we return a json string
  } catch(error) {
    console.log(error);
  }
}

// @desc    Gets a SINGLE Product
// @route   GET   /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(product));
    }
  } catch(error) {
    console.log(error);
  }
}

// @desc    Creates a Product
// @route   POST   /api/products
async function createProduct(req, res) {
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    }).on('end', async ()=> {
      const { name, description, price } = JSON.parse(body);
      const product = {
        name,
        description,
        price
      }
  
      const newProduct = await Product.create(product)
      res.writeHead(201, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify(newProduct));
    })

  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct
}