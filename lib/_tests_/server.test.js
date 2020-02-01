'use strict';

const supergoose = require('@code-fellows/supergoose');

const server = require('../server.js');

const agent = supergoose(server.apiServer);
const categories = require('../models/categories/categories.js');
const uuid = require('uuid/v4');

describe('API Routes work', () => {

  let testObj1;
  let testObj2;

  beforeEach(() => {
    testObj1 = {
      name: 'mythical_weapons',
      display_name: 'mythical weapons',
      description: 'smite thee!',
    };

    testObj2 = {
      name: 'household_goods',
      display_name: 'household goods',
      description: 'stuff fo yo crib!',
    };

    categories.database = [];
  });

  it('can post a record', () => {    
    return agent.post('/api/v1/categories').send(testObj1)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(!!response.body.id).toEqual(true);
        Object.keys(testObj1).forEach(key => {
          expect(testObj1[key]).toEqual(response.body[key]);
        });
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  it('can get all records', () => {
    testObj1.id = uuid();
    categories.database.push(testObj1);
    testObj2.id = uuid();
    categories.database.push(testObj2);

    return agent.get('/api/v1/categories')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBe(2);
        for (let index in response.body.results) {
          Object.keys(testObj1).forEach(key => {
            expect(categories.database[index][key]).toEqual(response.body.results[index][key]);
          });
        }
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  it('can get one record', () => {
    testObj1.id = uuid();
    categories.database.push(testObj1);

    return agent.get(`/api/v1/categories/${testObj1.id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.count).toBe(1);
        for (let index in response.body.results) {
          Object.keys(testObj1).forEach(key => {
            expect(categories.database[index][key]).toEqual(response.body.results[index][key]);
          });
        }
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  it('can update a record', () => {
    testObj1.id = uuid();
    categories.database.push(testObj1);
    const editObj = {
      name: 'uber_weapons',
      display_name: 'uber weapons',
      description: 'cool beans',
    };

    return agent.put(`/api/v1/categories/${testObj1.id}`).send(editObj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        Object.keys(editObj).forEach(key => {
          expect(response.body[key]).toEqual(editObj[key]);
        });
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  it('can delete a record', () => {
    testObj1.id = uuid();
    categories.database.push(testObj1);
    return agent.delete(`/api/v1/categories/${testObj1.id}`)
      .then(response => {
        expect(response.statusCode).toBe(204);
      })
      .catch(error => expect(error).not.toBeDefined());
  });
})