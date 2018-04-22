const { merge } = require('ramda');

const errors = require('./errors');

const invariants = require('./invariants')({ errors });
const dataclasses = require('./dataclasses')({ invariants });

const PredicateCore = require('./PredicateCore')({ dataclasses, invariants });

module.exports = { PredicateCore, errors, invariants, dataclasses };
