'use strict';

const { Board } = require('utils/db');
const boardFormatter = require('formatters/boardFormatter');
const cardProvider = require('dataProviders/cardProvider');
const columnProvider = require('dataProviders/columnProvider');

async function getBoards(ctx) {
  const boards = await Board.findAll({
    attributes: ['id', 'name']
  });

  ctx.status = 200;
  ctx.body = { boards: boardFormatter.fromAPI(boards) };
}

async function getBoardById(ctx) {
  const boardId = ctx.params.boardId;
  const [ board, cards, columns ] = await Promise.all([
    Board.findById(boardId),
    cardProvider.getCards(boardId),
    columnProvider.getColumns(boardId)
  ]);

  if (!board) {
    ctx.status = 404;
    ctx.body = { error: `Board #${boardId} is not found` };
    return;
  }

  let formattedBoard = boardFormatter.fromAPI(board);
  formattedBoard.cards = cards.map(card => card.id);
  formattedBoard.columns = columns.map(column => column.id);

  ctx.status = 200;
  ctx.body = {
    board: formattedBoard,
    cards,
    columns
  };
}

async function createBoard(ctx) {
  const payload = ctx.request.body.board;
  const board = await Board.create(payload);

  ctx.status = 201;
  ctx.body = { board: boardFormatter.fromAPI(board) };
}

module.exports = { getBoards, getBoardById, createBoard };