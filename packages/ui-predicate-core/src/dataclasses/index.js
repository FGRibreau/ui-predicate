const { merge } = require('ramda');

/**
 * Data classes
 * @namespace dataclasses
 * @since 1.0.0
 */
module.exports = errors =>
  merge(require('./columns'), require('./predicates')(errors));
