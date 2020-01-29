'use strict';

module.exports = (err, req, res, next) => {
  let error = {
    "text": "Server craaashed!",
    "error": err
  }
  res.status(500).json(error);
}