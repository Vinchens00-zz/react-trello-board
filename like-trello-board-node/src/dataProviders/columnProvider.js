'use strict';

const { Column } = require('utils/db');
const columnFormatter = require('formatters/columnFormatter');

async function getColumns(boardId) {
  const columns = await Column.findAll({
    attributes: ['id', 'name', 'boardId'],
    where: { boardId }
  });

  return columnFormatter.fromAPI(columns);
}

module.exports = { getColumns };
