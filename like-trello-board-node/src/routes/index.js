'use strict';

const Router = require('koa-router');
const router = new Router();

const boardController = require('controllers/boardController');
const boardValidator = require('middlewares/validators/boardValidator');

const columnController = require('controllers/columnController');

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
  .post('/api/boards/:boardId/columns', notImplemented)
  .patch('/api/columns/:columnId', notImplemented)

  //cards
  .get('/api/boards/:boardId/cards', notImplemented)
  .get('/api/boards/:boardId/cards/:cardId', notImplemented)
  .post('/api/boards/:boardId/cards', notImplemented)
  .patch('/api/boards/:boardId/cards/:cardId')
  .delete('/api/boards/:boardId/cards/:cardId', notImplemented)

  //comments
  .get('/api/boards/:boardId/cards/:cardId/comments', notImplemented)
  .post('/api/boards/:boardId/cards/:cardId/comments', notImplemented);

module.exports = router.routes();