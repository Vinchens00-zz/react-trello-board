'use strict';

const validator = require('utils/validator');

const BOARD_PAYLOAD = ['board', 'board.name'];

async function validateBoard(ctx, next) {
  const errors = validator.validateFields(ctx.request.body, BOARD_PAYLOAD);
  if (errors) {
    ctx.status = 400;
    ctx.body = { errors };
    return;
  }

  await next();
}

module.exports = { validateBoard };