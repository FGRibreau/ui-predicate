const { merge } = require('ramda');

const errors = require('./errors');

const rules = require('./rules');
const invariants = require('./invariants')({ errors, rules });
const dataclasses = require('./dataclasses')({ invariants, errors });

const PredicateCore = require('./PredicateCore')({
  dataclasses,
  invariants,
  errors,
  rules,
});

module.exports = { PredicateCore, errors, invariants, dataclasses };
