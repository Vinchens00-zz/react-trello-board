'use strict';

const { get } = require('lodash');

function validateFields(payload, fields) {
  const errors = fields.map(field => get(payload, field, null) ? null : field)
    .filter(field => field)
    .map(field => {
      return { field, message: `${field} should not be empty` }
    });

  return errors.length ? errors : null;
}

module.exports = { validateFields };