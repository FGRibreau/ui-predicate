const errors = require('./errors');
const UITypes = require('./UITypes');
const rules = require('./rules');
const invariants = require('./invariants')({ errors, rules });
const dataclasses = require('./dataclasses')({ invariants, errors });
const PredicateCore = require('./PredicateCore')({
  dataclasses,
  invariants,
  errors,
  rules,
  UITypes,
});

module.exports = { PredicateCore, errors, invariants, UITypes, dataclasses };
