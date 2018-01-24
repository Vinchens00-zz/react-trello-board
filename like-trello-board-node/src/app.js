'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const routes = require('routes');
const config = require('utils/config');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(routes);

app.listen(config.get('api:port'));
/* eslint-disable no-console */
console.log('Server is started on ' + config.get('api:port') + ' port');
/* eslint-enable no-console */
