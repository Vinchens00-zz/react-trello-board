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

function toAPI(card) {
  return pick(card, ['name', 'description', 'position', 'columnId']);
}

module.exports = { fromAPI, toAPI };