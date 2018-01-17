'use strict';

const validator = require('utils/validator');
const cardFormatter = require('formatters/cardFormatter');
const { isEmpty } = require('lodash');

const CARD_PAYLOAD_FIELDS = ['card', 'card.name', 'card.position', 'card.description', 'card.columnId'];

async function validateColumn(ctx, next) {
  const errors = validator.validateFields(ctx.request.body, CARD_PAYLOAD_FIELDS);
  if (errors) {
    ctx.status = 400;
    ctx.body = { errors };
    return;
  }

  await next();
}

async function validatePartialUpdate(ctx, next) {
  const payload = cardFormatter.toAPI(ctx.request.body.card);

  if (isEmpty(payload)) {
    ctx.status = 400;
    ctx.body = { error: 'There are no fields to update' };
    return;
  }

  ctx.preparedPayload = payload;
  await next();
}

module.exports = { validateColumn, validatePartialUpdate };