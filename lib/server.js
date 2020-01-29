'use strict';

const express = require('express');

const app = express();

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

app.get('/categories', (req, res) => {
  let output = {
    type: req.query.id
  }
  res.status(200).json(output);
});

app.get('/categories/:id', (req, res) => {
  let output = {
    type: req.params.id
  }
  res.status(200).json(output);
});

app.post('/categories', (req, res) => {
  console.log('Which category got added?', req.body);
  res.status(201).send('ok');
});