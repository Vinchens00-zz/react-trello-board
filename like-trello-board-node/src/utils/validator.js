'use strict';

const { get } = require('lodash');

const EMPTY_VALUES = [ undefined, null ];

function validateFields(payload, fields) {
  const errors = fields.map(field => EMPTY_VALUES.includes(get(payload, field)) ? field : null)
    .filter(field => field)
    .map(field => {
      return { field, message: `${field} should not be empty` }
    });

  return errors.length ? errors : null;
}

module.exports = { validateFields };