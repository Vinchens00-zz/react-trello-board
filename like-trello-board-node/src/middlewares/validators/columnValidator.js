'use strict';

const validator = require('utils/validator');

const COLUMN_PAYLOAD = ['column', 'column.name'];

async function validateColumn(ctx, next) {
  const errors = validator.validateFields(ctx.request.body, COLUMN_PAYLOAD);
  if (errors) {
    ctx.status = 400;
    ctx.body = { errors };
    return;
  }

  await next();
}

module.exports = { validateColumn };