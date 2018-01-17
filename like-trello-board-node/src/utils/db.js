'use strict';

const Sequelize = require('sequelize');
const config = require('utils/config');

let db = {};
const { assign } = Object;

const sequelize = new Sequelize(config.get('database'));
const Board = require('models/board')(sequelize);
const Column = require('models/column')(sequelize);
const Card = require('models/card')(sequelize);
const Comment = require('models/comment')(sequelize);

Column.belongsTo(Board);
Card.belongsTo(Board);
Card.belongsTo(Column);
Card.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Card);

assign(db, { Board, Column, Card, Comment });
sequelize.sync();

module.exports = db;
