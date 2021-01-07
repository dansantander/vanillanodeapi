const Product = require('../models/productModel');
const { getPostData } = require('../utils');

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
// Using utils getPostData for setting body
async function createProduct(req, res) {
  try {
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);
      const product = {
        name,
        description,
        price
      }
  
      const newProduct = await Product.create(product)
      res.writeHead(201, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify(newProduct));

  } catch(error) {
    console.log(error);
  }
}

// @desc    Updates a Product
// @route   PUT   /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
        const body = await getPostData(req);
        const { name, description, price } = JSON.parse(body);
        const productData = {
          name: name || product.title,
          description: description || product.description,
          price: price || product.price,
        }
        const updatedProduct = await Product.update(id, productData)
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(updatedProduct));
    }
  } catch(error) {
    console.log(error);
  }
}

// @desc    Deletes a SINGLE Product
// @route   DELETE   /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      await Product.remove(id)
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch(error) {
    console.log(error);
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}

/*** ORIGINAL createProduct function */
//    it grabs data from the request
//    returns body with data as a string
//    it assigns name, description and price to body's attributes
/*
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
*/