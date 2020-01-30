'use strict';

const uuid = require('uuid/v4');
const Validator = require('./validator.js');
const validator = new Validator();

class Collection {

  constructor(DataModel) {
    // this.DataModel = DataModel;
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(record) {
    console.log('beginning of create?');
    record.id = uuid();
    // console.log('Are we hitting the create?');
    // let record = new this.DataModel(data);
    // if (!validator.isValid(record, record.schema)) { return Promise.reject('Invalid object'); }

    this.database.push(record);
    console.log('Promise record to return: ', record);
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

  sanitize(entry) {
    return Object.keys(this.schema).every(field => {
      if (this.schema[field].required && !entry[field]) { return false; }
      else { return true; }
    });
  }
}

module.exports = Collection;