'use strict';

// 3rd party dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// dependencies we made
const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const app = express();

// 3rd party global middleware
app.use(cors());
app.use(morgan('dev'));

// own middleware
app.use(express.json());

function timestamp() {
  return (req, res, next) => {
    req.requestTime = Date.now();
    next();
  }
}

function logger() {
  return (req, res, next) => {
    console.log(`Path: ${req.path}, Method: ${req.method}, Request Time: ${req.requestTime}`);
    next();
  }
}

app.get('/api/v1/categories', getAllCategories);
app.get('/api/v1/categories/:id', getOneCategory);
app.post('/api/v1/categories', createCategory);
app.put('/api/v1/categories/:id', updateCategory);
app.delete('/api/v1/categories:id', deleteCategory);

function getAllCategories(req, res) {
  res.status(200).send('get all categories');
}

function getOneCategory(req, res) {
  res.status(200).send('get one category');
}

function updateCategory(req, res) {
  res.status(200).send('update category');
}

function deleteCategory(req, res) {
  res.status(200).send('delete category');
}

// function createCategory(req, res) {
//   let record = req.body;
//   categories.create(record)
//     .then(createdRecord => {
//       res.status(200).json(createdRecord);
//     });
//   res.status(200).send('created a category');
// }

function createCategory(req, res) {
  res.status(200).send('delete category');
}
// app.get('/api/v1/categories', (req, res) => {
//   let output = {
//     type: req.query.id
//   }
//   res.status(200).json(output);
// });

// app.get('/api/v1/categories/:id', (req, res) => {
//   let output = {
//     type: req.params.id
//   }
//   res.status(200).json(output);
// });

// app.post('/categories', (req, res) => {
//   console.log('Which category got added?', req.body);
//   res.status(201).send('ok');
// });

// error handling (unsupported routes)
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  apiServer: app,
  start: (port) => {
    app.listen(port, () => console.log('running on', port));
  }
}