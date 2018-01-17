'use strict';

const { Board } = require('utils/db');
const boardFormatter = require('formatters/boardFormatter');

async function getBoards(ctx) {
  const boards = await Board.findAll({
    attributes: ['id', 'name']
  });

  ctx.status = 200;
  ctx.body = { boards: boardFormatter.fromAPI(boards) };
}

async function getBoardById(ctx) {
  const boardId = ctx.params.boardId;
  const board = await Board.findById(boardId);

  if (!board) {
    ctx.status = 404;
    ctx.body = { error: `Board #${boardId} is not found` };
    return;
  }

  ctx.status = 200;
  ctx.body = { board: boardFormatter.fromAPI(board) };
}

async function createBoard(ctx) {
  const payload = ctx.request.body.board;
  const board = await Board.create(payload);

  ctx.status = 201;
  ctx.body = { board: boardFormatter.fromAPI(board) };
}

module.exports = { getBoards, getBoardById, createBoard };