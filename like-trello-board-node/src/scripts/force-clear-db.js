'use strict';

const config = require('utils/config');
config.set('database:sync:force', true);

require('utils/db');
