'use strict';

const Sequalize = require('sequelize');

module.exports = function (sequalize) {
  return sequalize.define('comment', {
    message: {
      type: Sequalize.STRING
    }
  });
};
