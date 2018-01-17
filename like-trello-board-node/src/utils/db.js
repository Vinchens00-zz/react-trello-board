'use strict';

const Sequelize = require('sequelize');
const config = require('config');

let db = {};
const { assign } = Object;

const sequelize = new Sequelize(config.get('database'));
const Board = require('models/board')(sequelize);

assign(db, { Board });
sequelize.sync();

module.exports = db;
