const { mergeAll, trim } = require('ramda');
const $_type = require('./$_type');

/**
 * Target type definition
 * @typedef {Object} Target
 * @memberof dataclasses
 */

/**
 * Create a new target
 * @param {object} target target
 * @param {string} target.target_id - unique id for this target
 * @param {string} target.label - label that will be displayed for this target
 * @param {string} target.type_id - the type_id name this target has
 * @return {Target} {@link dataclasses.Target}
 * @memberof dataclasses
 */
function Target(target) {
  const { target_id, label, type_id } = _requireProps(
    target,
    'target_id,label,type_id'
  );
  // target MUST at least have the attributes bellow
  return mergeAll([$_type('Target'), { target_id, label, type_id }, target]);
}

/**
 * @param  {Target} target target
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
 * @param {object} operator operator
 * @param {string} operator.operator_id - unique id for this operator
 * @param {string} operator.argumentType_id - the argumentType associated with the operator. For example to define a "is" operator and associate it with two targets "article publishing date" and "article title" then we would have to define 2 operators because ["article publishing date" "is"] and  ["article title" "is"] do NOT have the same kind of arguments (one is a date the other is a string) and associated UI components (one is a date picker the other is a text input)
 * @param {string} operator.label - label that will be displayed for this operator
 * @return {Operator} {@link dataclasses.Operator}
 * @memberof dataclasses
 */
function Operator(operator) {
  // operator MUST at least have the properties bellow
  const { operator_id, label, argumentType_id } = _requireProps(
    operator,
    'operator_id,label,argumentType_id'
  );
  return mergeAll([
    $_type('Operator'),
    {
      operator_id,
      argumentType_id,
      label,
    },
    operator,
  ]);
}

/**
 * @param  {Operator} operator operator
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
 * @param {Object} type type
 * @param {string} type.type_id type_id
 * @param {string[]} type.operator_ids array of operator_id
 * @return {Type} {@link dataclasses.Type}
 * @memberof dataclasses
 */
function Type(type) {
  // type MUST at least have the properties bellow
  const { type_id, operator_ids } = _requireProps(type, 'type_id,operator_ids');
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
 * @param {Object} logicalType The predicate logic
 * @param {string} logicalType.logicalType_id logicalType_id
 * @param {string} logicalType.label label
 * @return {object} logicalType object
 * @memberof dataclasses
 */
function LogicalType(logicalType) {
  // logicalType MUST at least have the properties bellow
  const { logicalType_id, label } = _requireProps(
    logicalType,
    'logicalType_id,label'
  );
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
 * @param  {LogicalType} logicalType logicalType
 * @return {Object} JSON serializable object
 */
LogicalType.toJSON = function(logicalType) {
  return {
    logicalType_id: logicalType.logicalType_id,
  };
};

/**
 * Create a new argument type
 * @param {Object} argumentType argumentType
 * @param {string} type.argumentType_id argumentType_id
 * @param {*} type.component this attribute will be used by the UI Framework adapter
 * @return {object} ArgumentType
 * @memberof dataclasses
 */
function ArgumentType(argumentType) {
  // argumentType MUST at least have the properties bellow
  const { argumentType_id, component } = _requireProps(
    argumentType,
    'argumentType_id,component'
  );
  return mergeAll([
    $_type('ArgumentType'),
    {
      argumentType_id,
      component,
    },
    argumentType,
  ]);
}

const _toString = Object.prototype.toString;
function _isObject(mixed) {
  return _toString.call(mixed) === '[object Object]';
}
/**
 * @param       {Object} object object
 * @param       {string} properties comma-separated list of properties
 * @return      {Object} the passed object
 * @throws throw if a property is missing from the object
 * @private
 */
function _requireProps(object, properties) {
  if (!_isObject(object))
    throw new Error(`Object is required, got: ${JSON.stringify(object)}.`);

  const props = properties.split(',').map(trim);
  let prop;

  while ((prop = props.pop())) {
    if (!object.hasOwnProperty(prop)) {
      throw new Error(
        `Object ${JSON.stringify(object)} MUST have a '${prop}' property.`
      );
    }
  }

  return object;
}

module.exports = {
  Type,
  Target,
  Operator,
  LogicalType,
  ArgumentType,
  _requireProps,
};
