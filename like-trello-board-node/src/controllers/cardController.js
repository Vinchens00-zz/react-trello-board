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

async function getCard(ctx) {
  const boardId = ctx.params.boardId;
  const cardId = ctx.params.cardId;

  const card = await Card.findOne({
    where: { id: cardId, boardId }
  });

  if (!card) {
    ctx.status = 404;
    ctx.body = { error: `Card #${cardId} is not found` };
    return;
  }

  ctx.status = 200;
  ctx.body = { card: cardFormatter.fromAPI(card) };
}

module.exports = { getCards, getCard };
