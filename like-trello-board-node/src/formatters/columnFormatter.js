'use strict';

const { pick } = require('lodash');

function fromAPI(rows) {
  if (Array.isArray(rows)) {
    return rows.map(row => _fromAPI(row));
  } else {
    return _fromAPI(rows);
  }
}

function _fromAPI(column) {
  return pick(column, ['id', 'name']);
}

module.exports = { fromAPI };