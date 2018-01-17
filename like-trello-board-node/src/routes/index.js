'use strict';

const Router = require('koa-router');
const router = new Router();

const boardController = require('controllers/boardController');
const boardValidator = require('middlewares/validators/boardValidator');

const columnController = require('controllers/columnController');
const columnValidator = require('middlewares/validators/columnValidator');

const cardController = require('controllers/cardController');

async function notImplemented(ctx) {
  ctx.status = 501;
  ctx.body = { error: 'Will be implemented later' };
}

router
  // boards
  .get('/api/boards', boardController.getBoards)
  .get('/api/boards/:boardId', boardController.getBoardById)
  .post('/api/boards', boardValidator.validateBoard, boardController.createBoard)

  // columns
  .get('/api/boards/:boardId/columns', columnController.getColumns)
  .post('/api/boards/:boardId/columns', columnValidator.validateColumn, columnController.createColumn)
  .put('/api/columns/:columnId', columnValidator.validateColumn, columnController.updateColumn)

  //cards
  .get('/api/boards/:boardId/cards', cardController.getCards)
  .get('/api/boards/:boardId/cards/:cardId', cardController.getCard)
  .post('/api/boards/:boardId/cards', notImplemented)
  .patch('/api/boards/:boardId/cards/:cardId')
  .delete('/api/boards/:boardId/cards/:cardId', notImplemented)

  //comments
  .get('/api/boards/:boardId/cards/:cardId/comments', notImplemented)
  .post('/api/boards/:boardId/cards/:cardId/comments', notImplemented);

module.exports = router.routes();