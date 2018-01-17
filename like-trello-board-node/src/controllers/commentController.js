'use strict';

const { Comment } = require('utils/db');
const commentFormatter = require('formatters/commentFormatter');

const { assign } = Object;

async function createComment(ctx) {
  const cardId = ctx.params.cardId;
  const payload = assign({ cardId }, ctx.request.body.comment);
  const comment = await Comment.create(payload);

  ctx.status = 201;
  ctx.body = { comment: commentFormatter.fromAPI(comment) };
}

module.exports = { createComment };
