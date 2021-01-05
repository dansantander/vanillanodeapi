const products = require('../data/products.json');

// It's not technically necessary to return promises
// but we do it in order to respect API's way of working
// when using data

function findAll() {
  return new Promise((resolve, reject)=> {
    resolve(products);
  })
}

function findById(id) {
  const product = products.find( p => p.id === id )
  return new Promise((resolve, reject)=> {
    resolve(product);
  })
}

module.exports = {
  findAll,
  findById
}