'use strict';

const Collection = require('../collection.js');
const schema = require('./product.js');

class Products extends Collection {
  constructor() {
    super();
    this.schema = schema;
  }
}

module.exports = Products;