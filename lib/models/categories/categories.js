'use strict';

const Model = require('../collection.js');

class Categories extends Model {
  constructor() {
    super();
    this.schema = {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      display_name: { type: 'string', required: true },
      description: { type: 'string' },
    };
  }
}

module.exports = Categories;