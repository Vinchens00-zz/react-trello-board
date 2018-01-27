'use strict';

const { Card } = require('utils/db');
const cardFormatter = require('formatters/cardFormatter');

async function getCards(boardId) {
  const cards = await Card.findAll({
    attributes: ['id', 'name', 'description', 'columnId', 'boardId', 'position'],
    where: { boardId }
  });

  return cardFormatter.fromAPI(cards);
}

module.exports = { getCards };
