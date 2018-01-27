'use strict';

const { Column } = require('utils/db');
const columnFormatter = require('formatters/columnFormatter');
const columnProvider = require('dataProviders/columnProvider');

const { assign } = Object;

async function getColumns(ctx) {
  const boardId = ctx.params.boardId;
  const columns = await columnProvider.getColumns(boardId);

  ctx.status = 200;
  ctx.body = { columns };
}

async function createColumn(ctx) {
  const boardId = ctx.params.boardId;
  const payload = ctx.request.body.column;
  const column = await Column.create(assign( { boardId }, payload));

  ctx.status = 201;
  ctx.body = { column: columnFormatter.fromAPI(column) };
}

async function updateColumn(ctx) {
  const columnId = ctx.params.columnId;
  const payload = ctx.request.body.column;

  const [ updatedCount ] = await Column.update(columnFormatter.toAPI(payload), {
    where: {
      id: columnId
    }
  });

  if (updatedCount === 0) {
    ctx.status = 404;
    ctx.body = { error: `Column #${columnId} is not found` };
    return;
  }

  ctx.status = 200;
  ctx.body = { column: payload }
}

module.exports = { getColumns, createColumn, updateColumn };