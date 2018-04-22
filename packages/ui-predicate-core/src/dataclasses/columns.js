const { mergeAll } = require('ramda');
const $_type = require('./$_type');

/**
 * A target
 * @param       {object} target
 * @param       {string} target.target_id [description]
 * @param       {string} target.label     [description]
 * @param       {string} target.type_id   [description]
 * @memberof dataclasses
 */
function Target(target) {
  // target MUST at least have the attributes bellow
  const { target_id, label, type_id } = target;
  return mergeAll([$_type('Target'), { target_id, label, type_id }, target]);
}

/**
 * A type operator
 * @param       {object} operator [description]
 * @param       {string} operator.operator_id [description]
 * @param       {string} operator.label       [description]
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
 * Defines a target type
 * @param       {string} type_id      [description]
 * @param       {string[]} operator_ids [description]
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

module.exports = { Type, Target, Operator };
