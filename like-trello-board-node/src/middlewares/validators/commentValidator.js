'use strict';

const validator = require('utils/validator');

const COMMENT_BODY_PAYLOAD = ['comment', 'comment.message'];

async function validateComment(ctx, next) {
  const errors = validator.validateFields(ctx.request.body, COMMENT_BODY_PAYLOAD);
  if (errors) {
    ctx.status = 400;
    ctx.body = { errors };
    return;
  }

  await next();
}

module.exports = { validateComment };