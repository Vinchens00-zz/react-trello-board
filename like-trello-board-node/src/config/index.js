'use strict';

const nconf = require('nconf');

const CONFIG_PATH = `${__dirname}/config.json`;

nconf
  .env({ separator: '_', lowerCase: true, parseValues: true })
  .file({ file: CONFIG_PATH });

module.exports = nconf;
