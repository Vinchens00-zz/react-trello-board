'use strict';

const { pick } = require('lodash');

function fromAPI(rows) {
  if (Array.isArray(rows)) {
    return rows.map(row => _fromAPI(row));
  } else {
    return _fromAPI(rows);
  }
}

function _fromAPI(comment) {
  return pick(comment, ['id', 'name', 'cardId']);
}

module.exports = { fromAPI };