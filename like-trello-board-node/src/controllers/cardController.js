'use strict';

const { Card } = require('utils/db');
const cardFormatter = require('formatters/cardFormatter');

async function getCards(ctx) {
  const boardId = ctx.params.boardId;
  const cards = await Card.findAll({
    attributes: ['id', 'name', 'description', 'columnId', 'boardId', 'position'],
    where: { boardId }
  });

  ctx.status = 200;
  ctx.body = { cards: cardFormatter.fromAPI(cards) };
}

module.exports = { getCards };
