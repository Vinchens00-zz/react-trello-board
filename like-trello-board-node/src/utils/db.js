'use strict';

const Sequelize = require('sequelize');
const config = require('utils/config');

let db = {};
const { assign } = Object;

const sequelize = new Sequelize(config.get('database'));
const Board = require('models/board')(sequelize);
const Column = require('models/column')(sequelize);
const Card = require('models/card')(sequelize);

Column.belongsTo(Board);
Card.belongsTo(Board);
Card.belongsTo(Column);

assign(db, { Board, Column, Card });
sequelize.sync();

module.exports = db;
