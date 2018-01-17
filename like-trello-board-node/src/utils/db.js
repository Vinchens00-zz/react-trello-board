'use strict';

const Sequelize = require('sequelize');
const config = require('utils/config');

let db = {};
const { assign } = Object;

const sequelize = new Sequelize(config.get('database'));
const Board = require('models/board')(sequelize);

assign(db, { Board });
sequelize.sync();

module.exports = db;
