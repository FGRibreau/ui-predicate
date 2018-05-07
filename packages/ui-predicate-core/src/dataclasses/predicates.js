const { merge, mergeAll } = require('ramda');
const $_type = require('./$_type');

module.exports = ({ invariants, errors }) => {
  const { Target, Operator, LogicalType } = require('./columns');
  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} Predicate
   * @memberof dataclasses
   */

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @param {Function} type - Predicate subtype function constructor
   * @return {dataclasses.Predicate} predicate
   * @memberof dataclasses
   */
  function Predicate(type) {
    return invariants
      .PredicateTypeMustBeValid(type.$name, Predicate.Types)
      .then(() =>
        merge($_type(type.$name), {
          /**
           * $canBeRemoved specify if the predicate can be removed or not from the Predicates tree
           * @type {Boolean}
           *  @memberof Predicate
           */
          $canBeRemoved: true,
        })
      );
  }

  /**
   * [description]
   * @param  {dataclasses.Predicate} predicate predicate
   * @return {Object} serializable object
   */
  Predicate.toJSON = function(predicate) {
    if (ComparisonPredicate.is(predicate))
      return ComparisonPredicate.toJSON(predicate);

    return CompoundPredicate.toJSON(predicate);
  };

  /**
   * @param  {object} json json
   * @param  {object} internalAPI internalAPI
   * @return {Promise<Predicate, errors<*>>} Promise
   */
  Predicate.fromJSON = function(json, internalAPI) {
    if (ComparisonPredicate.isFromJSON(json))
      return ComparisonPredicate.fromJSON(json, internalAPI);

    if (CompoundPredicate.isFromJSON(json))
      return CompoundPredicate.fromJSON(json, internalAPI);

    return Promise.reject(new errors.UnknownJSONData());
  };

  Predicate.Types = {
    ComparisonPredicate: 'ComparisonPredicate',
    CompoundPredicate: 'CompoundPredicate',
  };

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} ComparisonPredicate
   * @param {string} target - unique id for this target
   * @param {string} operator - label that will be displayed for this target
   * @param {string} argument - the type_id name this target has
   * @memberof dataclasses
   */

  /**
   * A specialized predicate that you use to compare expressions.
   * @param  {dataclasses.Target} target target
   * @param  {dataclasses.Operator} operator operator
   * @param  {*} argument argument
   * @return {Promise<dataclasses.ComparisonPredicate>} yield a ComparisonPredicate or a rejected promise
   * @memberof dataclasses
   */
  function ComparisonPredicate(target, operator, argument = null) {
    return Predicate(ComparisonPredicate).then(predicate =>
      merge(predicate, {
        target,
        operator,
        argument,
      })
    );
  }

  // by pass var. mangling from minify
  ComparisonPredicate.$name = Predicate.Types.ComparisonPredicate;

  /**
   * @param  {ComparisonPredicate} predicate predicate
   * @return {Object} JSON serializable object
   */
  ComparisonPredicate.toJSON = function(predicate) {
    return mergeAll([
      Target.toJSON(predicate.target),
      Operator.toJSON(predicate.operator),
      {
        argument: predicate.argument,
      },
    ]);
  };

  /**
   * @param  {object} json json
   * @param  {object} internalAPI internalAPI
   * @return {Promise<Predicate, errors<*>>} Promise
   */
  ComparisonPredicate.fromJSON = function(json, internalAPI) {
    return Promise.all([
      internalAPI.getTargetById(json.target_id),
      internalAPI.getOperatorById(json.operator_id),
    ]).then(([target, operator]) =>
      ComparisonPredicate(target, operator, json.argument)
    );
  };

  /**
   * Yield true if `predicate` is a ComparisonPredicate
   * @param  {dataclasses.Predicate}  predicate {@link dataclasses.Predicate}
   * @return {Boolean} true if `predicate` is a ComparisonPredicate
   * @memberof dataclasses
   */
  ComparisonPredicate.is = predicate => {
    return (
      predicate && predicate.$_type === Predicate.Types.ComparisonPredicate
    );
  };

  /**
   * Yield true if `json` seems to be a ComparisonPredicate
   * @param  {object} json json
   * @private
   * @return {Boolean} true if json seems to be a ComparisonPredicate
   * @memberof dataclasses
   */
  ComparisonPredicate.isFromJSON = json => json && json.target_id;

  /**
   * A specialized predicate that evaluates logical combinations of other predicates.
   * @param {dataclasses.LogicalType} logic The predicate logic
   * @param {Array<dataclasses.Predicate>} predicates predicates predicates
   * @return {Promise<dataclasses.CompoundPredicate>} yield a {@link dataclasses.CompoundPredicate} or a {@link errors.CompoundPredicateMustHaveAtLeastOneSubPredicate} rejected promise
   * @memberof dataclasses
   */
  function CompoundPredicate(logic, predicates) {
    return invariants
      .CompoundPredicateMustHaveAtLeastOneSubPredicate(
        predicates,
        CompoundPredicate
      )
      .then(() => Predicate(CompoundPredicate))
      .then(predicate =>
        merge(predicate, {
          logic,
          predicates,
        })
      );
  }

  // by pass var. mangling from minify
  CompoundPredicate.$name = Predicate.Types.CompoundPredicate;

  /**
   * @param  {CompoundPredicate} predicate predicate
   * @return {Object} JSON serializable object
   */
  CompoundPredicate.toJSON = function(predicate) {
    return mergeAll([
      LogicalType.toJSON(predicate.logic),
      { predicates: predicate.predicates.map(Predicate.toJSON) },
    ]);
  };

  /**
   * @param  {CompoundPredicate} predicate predicate
   * @param  {object} internalAPI ui-predicate-core internal api object
   * @return {Promise<CompoundPredicate, errors<*>>} Promise
   */
  CompoundPredicate.fromJSON = function(predicate, internalAPI) {
    return invariants
      .CompoundPredicateMustHaveAtLeastOneSubPredicate(
        predicate.predicates,
        CompoundPredicate
      )
      .then(() => internalAPI.getLogicalTypeById(predicate.logicalType_id))
      .then(logicalType =>
        Promise.all(
          predicate.predicates.map(predicate =>
            Predicate.fromJSON(predicate, internalAPI)
          )
        ).then(predicates => CompoundPredicate(logicalType, predicates))
      );
  };

  /**
   * Reduce through the predicates tree
   * @param       {dataclasses.CompoundPredicate} compoundPredicate starter node
   * @param       {function} f accumulation function, f(acc, predicate, parents)
   * @param       {T} acc               accumulator
   * @param       {Array}  [parents=[]]      path to the node, array of parents
   * @return      {T} yield the accumulator
   * @memberof dataclasses
   */
  CompoundPredicate.reduce = function(compoundPredicate, f, acc, parents = []) {
    const accumulator = f(acc, compoundPredicate, parents);
    return compoundPredicate.predicates.reduce((_acc, predicate, i) => {
      const _parents = parents.concat([compoundPredicate, [predicate, i]]);
      return CompoundPredicate.is(predicate)
        ? CompoundPredicate.reduce(predicate, f, _acc, _parents)
        : f(_acc, predicate, _parents);
    }, accumulator);
  };

  /**
   * Walk through the predicates tree
   * @param       {dataclasses.CompoundPredicate} compoundPredicate starter node
   * @param       {Function} f(predicate) iterator function
   * @return {undefined}
   * @memberof dataclasses
   */
  CompoundPredicate.forEach = (compoundPredicate, f) => {
    CompoundPredicate.reduce(
      compoundPredicate,
      (_, predicate) => {
        f(predicate);
      },
      null
    );
  };

  /**
   * Yield true if `predicate` is a CompoundPredicate
   * @param  {dataclasses.Predicate}  predicate predicate
   * @return {Boolean} true if `predicate` is a CompoundPredicate
   * @memberof dataclasses
   */
  CompoundPredicate.is = predicate =>
    predicate && predicate.$_type === Predicate.Types.CompoundPredicate;

  /**
   * Yield true if `json` seems to be a CompoundPredicate
   * @param  {object}  json json
   * @private
   * @return {Boolean} true if json seems to be a CompoundPredicate json
   * @memberof dataclasses
   */
  CompoundPredicate.isFromJSON = json => json && json.logicalType_id;

  return {
    Predicate,
    ComparisonPredicate,
    CompoundPredicate,
  };
};
