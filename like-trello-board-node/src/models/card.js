'use strict';

const Sequalize = require('sequelize');

module.exports = function (sequalize) {
  return sequalize.define('card', {
    name: {
      type: Sequalize.STRING
    },
    description: {
      type: Sequalize.STRING
    },
    position: {
      type: Sequalize.DOUBLE
    }
  });
};
