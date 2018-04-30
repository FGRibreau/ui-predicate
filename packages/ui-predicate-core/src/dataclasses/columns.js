const { mergeAll } = require('ramda');
const $_type = require('./$_type');

/**
 * Target type definition
 * @typedef {Object} Target
 * @memberof dataclasses
 */

/**
 * Create a new target
 * @param {object} target
 * @param {string} target.target_id - unique id for this target
 * @param {string} target.label - label that will be displayed for this target
 * @param {string} target.type_id - the type_id name this target has
 * @return {Target} {@link dataclasses.Target}
 * @memberof dataclasses
 */
function Target(target) {
  // target MUST at least have the attributes bellow
  const { target_id, label, type_id } = target;
  return mergeAll([$_type('Target'), { target_id, label, type_id }, target]);
}

/**
 * @param  {Target} target
 * @return {Object} JSON serializable object
 */
Target.toJSON = function(target) {
  return {
    target_id: target.target_id,
  };
};

/**
 * A type operator
 * @typedef Operator
 * @memberof dataclasses
 */

/**
 * Create a new operator
 * @param {object} operator
 * @param {string} operator.operator_id - unique id for this operator
 * @param {string} operator.label - label that will be displayed for this operator
 * @return {Operator} {@link dataclasses.Operator}
 * @memberof dataclasses
 */
function Operator(operator) {
  // operator MUST at least have the attributes bellow
  const { operator_id, label } = operator;
  return mergeAll([
    $_type('Operator'),
    {
      operator_id,
      label,
    },
    operator,
  ]);
}

/**
 * @param  {Operator} operator
 * @return {Object} JSON serializable object
 */
Operator.toJSON = function(operator) {
  return {
    operator_id: operator.operator_id,
  };
};

/**
 * Defines a target type
 * @typedef Type
 * @memberof dataclasses
 */

/**
 * Create a new type
 * @param {Object} type
 * @param {string} type.type_id
 * @param {string[]} type.operator_ids
 * @return {Type} {@link dataclasses.Type}
 * @memberof dataclasses
 */
function Type(type) {
  // operator MUST at least have the attributes bellow
  const { type_id, operator_ids } = type;
  return mergeAll([
    $_type('Type'),
    {
      type_id,
      operator_ids,
    },
    type,
  ]);
}

/**
 * Create a new type logical type
 * Logical types or used in CompoundPredicates
 * @param {Object} logic The predicate logic
 * @param {string} type.logicalType_id
 * @param {string} type.label
 * @memberof dataclasses
 */
function LogicalType(logicalType) {
  // logicalType MUST at least have the attributes bellow
  const { logicalType_id, label } = logicalType;
  return mergeAll([
    $_type('LogicalType'),
    {
      logicalType_id,
      label,
    },
    logicalType,
  ]);
}

/**
 * @param  {LogicalType} logicalType
 * @return {Object} JSON serializable object
 */
LogicalType.toJSON = function(logicalType) {
  return {
    logicalType_id: logicalType.logicalType_id,
  };
};

module.exports = { Type, Target, Operator, LogicalType };
