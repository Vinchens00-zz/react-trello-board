'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('routes');

const config = require('config');
const db = require('utils/db');

const app = new Koa();

app.use(bodyParser());
app.use(routes);

init();
async function init() {
  app.listen(config.get('api:port'));
  console.log('Server is started on ' + config.get('api:port') + ' port');
  await db.init();
}
