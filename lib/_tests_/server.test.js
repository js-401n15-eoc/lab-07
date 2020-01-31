'use strict';

const supergoose = require('@code-fellows/supergoose');

const server = require('../server.js');

const agent = supergoose(server.apiServer);

describe('API Routes work', () => {

  let testObj;

  beforeEach(() => {
    testObj = {
      name: 'mythical_weapons',
      display_name: 'mythical_weapons',
      description: 'smite thee!',
    };
  });

  it('can post a record', () => {    
    return agent.post('/api/v1/categories').send(testObj)
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  it('can get all record', () => {
    return agent.get('/api/v1/categories')
      .then(response => {
        expect(response.statusCode).toBe(200);
      })
      .catch(error => expect(error).not.toBeDefined());
  });

  // it('can get one record', () => {
  //   return agent.get('/api/v1/categories/1')
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);

  //     })
  //     .catch(error => expect(error).not.toBeDefined());
  // });

  // it('can update a record', () => {
  //   return agent.post('/api/v1/categories')
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);

  //     })
  //     .catch(error => expect(error).not.toBeDefined());
  // });

  // it('can delete a record', () => {
  //   return agent.post('/api/v1/categories')
  //     .then(response => {
  //       expect(response.statusCode).toBe(200);

  //     })
  //     .catch(error => expect(error).not.toBeDefined());
  // });
})