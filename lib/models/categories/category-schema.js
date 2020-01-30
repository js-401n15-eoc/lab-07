'use strict';

const mongoose = require('mongoose');

const category = mongoose.Schema({
  name: { type: 'string', required: true },
  display_name: { type: 'string', required: true },
  description: { type: 'string' },
});

module.exports = mongoose.model('category', category);