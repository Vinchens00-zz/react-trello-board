'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const routes = require('routes');
const config = require('utils/config');

const app = new Koa();

app.use(bodyParser());
app.use(routes);

app.listen(config.get('api:port'));
console.log('Server is started on ' + config.get('api:port') + ' port');
