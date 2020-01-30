'use strict';

const uuid = require('uuid/v4');
const mockFs = require('../__mocks__/fs.js');
const fs = require('fs');
const Validator = require('./validator.js');
const filePath = `${__dirname}/data/products.json`;
const validator = new Validator();

class Collection {

  constructor(DataModel) {
    this.DataModel = DataModel;
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(data) {
    data.id = uuid();
    let record = new this.DataModel(data);
    if (!validator.isValid(record, record.schema)) { return Promise.reject('Invalid object'); }

    this.database.push(record);
    return Promise.resolve(record);
  }

  update(id, record) {
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

}

module.exports = Collection;