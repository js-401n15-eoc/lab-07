'use strict';

const Collection = require('../collection.js');
const Category = require('./category.js');

class Categories extends Collection {
  constructor() {
    super(Category);
  }
}

module.exports = Categories;