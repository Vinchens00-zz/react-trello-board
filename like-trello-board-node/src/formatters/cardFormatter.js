'use strict';

const { pick } = require('lodash');

function fromAPI(rows) {
  if (Array.isArray(rows)) {
    return rows.map(row => _fromAPI(row));
  } else {
    return _fromAPI(rows);
  }
}

function _fromAPI(card) {
  return pick(card, ['id', 'name', 'description', 'columnId', 'boardId', 'position']);
}

module.exports = { fromAPI };