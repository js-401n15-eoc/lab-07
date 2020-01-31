'use strict';

const uuid = require('uuid/v4');

class Collection {

  constructor() {
    this.database = [];
  }

  get(id) {
    console.log('Are we in the get?');
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(record) {
    record.id = uuid();
    if (this.isValidObj(record)) {
      this.database.push(record);
      return Promise.resolve(record);
    } else {
      return Promise.reject('Invalid object');
    }
  }

  update(id, record) {
    this.database = this.database.map((item) => (item.id === id) ? record : item);
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  isValidObj(entry) {
    return Object.keys(this.schema).every(field => {
      return !(this.schema[field].required && !entry[field]);
    });
  }
}

module.exports = Collection;