const { merge } = require('ramda');

/**
 * Data classes
 * @namespace dataclasses
 * @param {object} errors ui-predicate errors object
 * @return {object} ui-predicate available data classes
 * @since 1.0.0
 */
module.exports = errors =>
  merge(require('./columns'), require('./predicates')(errors));
