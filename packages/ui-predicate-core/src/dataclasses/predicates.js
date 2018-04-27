const { merge } = require('ramda');
const $_type = require('./$_type');

module.exports = ({ invariants }) => {
  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} Predicate
   * @memberof dataclasses
   */

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @param {Function} type - Predicate subtype function constructor
   * @return {dataclasses.Predicate}
   * @memberof dataclasses
   */
  function Predicate(type) {
    return invariants
      .PredicateTypeMustBeValid(type.name, Predicate.Types)
      .then(() =>
        merge($_type(type.name), {
          /**
           * $canBeRemoved specify if the predicate can be removed or not from the Predicates tree
           * @type {Boolean}
           *  @memberof Predicate
           */
          $canBeRemoved: true,
        })
      );
  }

  Predicate.Types = {
    ComparisonPredicate: 'ComparisonPredicate',
    CompoundPredicate: 'CompoundPredicate',
  };

  /**
   * Abstract Predicate type, a Predicate is the union type of CompoundPredicate | ComparisonPredicate
   * @typedef {object} ComparisonPredicate
   * @param {string} target - unique id for this target
   * @param {string} operator - label that will be displayed for this target
   * @param {string} arguments - the type_id name this target has
   * @memberof dataclasses
   */

  /**
   * A specialized predicate that you use to compare expressions.
   * @param  {dataclasses.Target} target
   * @param  {dataclasses.Operator} operator
   * @param  {Array<*>} args
   * @return {Promise<dataclasses.ComparisonPredicate>} yield a ComparisonPredicate or a rejected promise
   * @memberof dataclasses
   */
  function ComparisonPredicate(target, operator, args) {
    return Predicate(ComparisonPredicate).then(predicate =>
      merge(predicate, {
        target: target,
        operator: operator,
        arguments: args,
      })
    );
  }

  /**
   * Yield true if `predicate` is a ComparisonPredicate
   * @param  {dataclasses.Predicate}  predicate {@link dataclasses.Predicate}
   * @return {Boolean}
   * @memberof dataclasses
   */
  ComparisonPredicate.is = predicate =>
    predicate.$_type === Predicate.Types.ComparisonPredicate;

  /**
   * A specialized predicate that evaluates logical combinations of other predicates.
   * @param {dataclasses.LogicalType} logic The predicate logic
   * @param {Array<dataclasses.Predicate>} predicates predicates
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
          logic: logic,
          predicates: predicates,
        })
      );
  }

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
    acc = f(acc, compoundPredicate, parents);
    return compoundPredicate.predicates.reduce((_acc, predicate, i) => {
      const _parents = parents.concat([compoundPredicate, [predicate, i]]);
      return CompoundPredicate.is(predicate)
        ? CompoundPredicate.reduce(predicate, f, _acc, _parents)
        : f(_acc, predicate, _parents);
    }, acc);
  };

  /**
   * Walk through the predicates tree
   * @param       {dataclasses.CompoundPredicate} compoundPredicate starter node
   * @param       {Function} f(predicate) iterator function
   * @memberof dataclasses
   */
  CompoundPredicate.forEach = (compoundPredicate, f) => {
    CompoundPredicate.reduce(
      compoundPredicate,
      (_, predicate, __) => {
        f(predicate);
      },
      null
    );
  };

  /**
   * LogicalType.not | LogicalType.and | LogicalType.or
   * @typedef {Object}
   * @memberof dataclasses
   */
  const LogicalType = {
    not: 'not',
    and: 'and',
    or: 'or',
  };

  /**
   * Yield true if `predicate` is a CompoundPredicate
   * @param  {dataclasses.Predicate}  predicate
   * @return {Boolean}
   * @memberof dataclasses
   */
  CompoundPredicate.is = predicate =>
    predicate.$_type === Predicate.Types.CompoundPredicate;

  return {
    LogicalType,
    Predicate,
    ComparisonPredicate,
    CompoundPredicate,
  };
};
