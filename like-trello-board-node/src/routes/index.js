'use strict';

const Router = require('koa-router');
const router = new Router();

const boardController = require('controllers/boardController');
const boardValidator = require('middlewares/validators/boardValidator');

const columnController = require('controllers/columnController');
const columnValidator = require('middlewares/validators/columnValidator');

const cardController = require('controllers/cardController');
const cardValidator = require('middlewares/validators/cardValidator');

const commentController = require('controllers/commentController');
const commentValidator = require('middlewares/validators/commentValidator');

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
  .post('/api/boards/:boardId/cards', cardValidator.validateColumn, cardController.createCard)
  .patch('/api/cards/:cardId', cardValidator.validatePartialUpdate, cardController.partiallyUpdateCard)
  .delete('/api/cards/:cardId', cardController.deleteCard)

  //comments
  .post('/api/cards/:cardId/comments', commentValidator.validateComment, commentController.createComment);

module.exports = router.routes();