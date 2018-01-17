'use strict';

const validator = require('utils/validator');

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

module.exports = { validateColumn };