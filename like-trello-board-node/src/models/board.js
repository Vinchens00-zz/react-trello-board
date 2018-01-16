'use strict';

const Sequalize = require('sequelize');

module.exports = function (sequalize) {
  return sequalize.define('board', {
    name: {
      type: Sequalize.STRING
    }
  });
};
