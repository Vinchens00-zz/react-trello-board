'use strict';

const { Column } = require('utils/db');
const columnFormatter = require('formatters/columnFormatter');

async function getColumns(ctx) {
  const boardId = ctx.params.boardId;

  const columns = await Column.findAll({
    attributes: ['id', 'name'],
    where: { boardId: boardId }
  });

  ctx.status = 200;
  ctx.body = { columns: columnFormatter.fromAPI(columns) };
}

module.exports = { getColumns };