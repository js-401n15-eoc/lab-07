'use strict';

const supergoose = require('@code-fellows/supergoose');

const server = require('../server');

const agent = supergoose(server.apiServer);

describe('API Routes', () => {
  it(' can post a record', () => {
    return agent.post('/api/v1/categories')
      .then(response => {
        expect(response.statusCode).toBe(200);

      })
      .catch(error => expect(error).not.toBeDefined());
  });
})