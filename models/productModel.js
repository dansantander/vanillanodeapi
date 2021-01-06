const products = require('../data/products.json');
const { writeDataToFile } = require('../utils');

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

function create(product) {
  const id = products.length + 1;
  const newProduct = {id, ...product};
  products.push(newProduct);
  writeDataToFile('./data/products.json', products);
  return new Promise((resolve, reject)=> {
    resolve(newProduct);
  })
}

module.exports = {
  findAll,
  findById,
  create
}