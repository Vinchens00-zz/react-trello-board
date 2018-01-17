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
  const formatted = pick(card, ['id', 'name', 'description', 'columnId', 'boardId', 'position']);
  if (card.comments) {
    formatted.comments = card.comments.map(comment => comment.id);
  }

  return formatted;
}

function toAPI(card) {
  return pick(card, ['name', 'description', 'position', 'columnId']);
}

module.exports = { fromAPI, toAPI };