'use strict';

const Sequelize = require('sequelize');
const config = require('utils/config');

let db = {};
const { assign } = Object;

const sequelize = new Sequelize(config.get('database'));
const Board = require('models/board')(sequelize);
const Column = require('models/column')(sequelize);

Column.belongsTo(Board);

assign(db, { Board, Column });
sequelize.sync();

module.exports = db;
