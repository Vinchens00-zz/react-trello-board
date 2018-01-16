'use strict';

const Sequelize = require('sequelize');
const config = require('config');

let db = {};
const { assign } = Object;

async function init() {
  const sequelize = new Sequelize(config.get('database'));
  const Board = require('models/board')(sequelize);

  assign(db, { Board });
  await sequelize.sync();
}

db.init = init;

module.exports = db;
