'use strict';

const { Column } = require('utils/db');
const columnFormatter = require('formatters/columnFormatter');

const { assign } = Object;

async function getColumns(ctx) {
  const boardId = ctx.params.boardId;

  const columns = await Column.findAll({
    attributes: ['id', 'name', 'boardId'],
    where: { boardId: boardId }
  });

  ctx.status = 200;
  ctx.body = { columns: columnFormatter.fromAPI(columns) };
}

async function createColumn(ctx) {
  const boardId = ctx.params.boardId;
  const payload = ctx.request.body.column;
  const column = await Column.create(assign( { boardId }, payload));

  ctx.status = 201;
  ctx.body = { column: columnFormatter.fromAPI(column) };
}

module.exports = { getColumns, createColumn };