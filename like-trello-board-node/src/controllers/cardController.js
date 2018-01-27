'use strict';

const { Card, Comment } = require('utils/db');
const cardFormatter = require('formatters/cardFormatter');
const commentFormatter = require('formatters/commentFormatter');
const cardProvider = require('dataProviders/cardProvider');

const { assign } = Object;

async function getCards(ctx) {
  const boardId = ctx.params.boardId;
  const cards = await cardProvider.getCards(boardId);

  ctx.status = 200;
  ctx.body = { cards };
}

async function getCard(ctx) {
  const boardId = ctx.params.boardId;
  const cardId = ctx.params.cardId;

  const card = await Card.findOne({
    where: { id: cardId, boardId },
    include: [{
      model: Comment,
      as: 'comments'
    }]
  });

  if (!card) {
    ctx.status = 404;
    ctx.body = { error: `Card #${cardId} is not found` };
    return;
  }

  ctx.status = 200;
  ctx.body = { card: cardFormatter.fromAPI(card), comments: commentFormatter.fromAPI(card.comments) };
}

async function createCard(ctx) {
  const payload = ctx.request.body.card;
  const boardId = ctx.params.boardId;

  const card = await Card.create(assign({ boardId }, payload));

  ctx.status = 201;
  ctx.body = { card: cardFormatter.fromAPI(card) };
}

async function deleteCard(ctx) {
  const cardId = ctx.params.cardId;

  const deletedCount = await Card.destroy({
    where: {
      id: cardId
    }
  });

  if (deletedCount === 0) {
    ctx.status = 404;
    ctx.body = { error: `Card #${cardId} is not found` };
    return;
  }

  ctx.status = 204;
}

async function partiallyUpdateCard(ctx) {
  const cardId = ctx.params.cardId;
  const payload = ctx.preparedPayload;

  const [ updatedCount ] = await Card.update(cardFormatter.toAPI(payload), {
    where: {
      id: cardId
    }
  });

  if (updatedCount === 0) {
    ctx.status = 404;
    ctx.body = { error: `Card #${cardId} is not found` };
    return;
  }

  const updatedCard = await Card.findById(cardId, {
    include: [{
      model: Comment,
      as: 'comments'
    }]
  });

  ctx.status = 200;
  ctx.body = { card: cardFormatter.fromAPI(updatedCard), comments: commentFormatter.fromAPI(updatedCard.comments) };
}

module.exports = { getCards, getCard, createCard, deleteCard, partiallyUpdateCard };
