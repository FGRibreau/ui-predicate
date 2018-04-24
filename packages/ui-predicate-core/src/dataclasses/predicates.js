const { merge } = require('ramda');
const $_type = require('./$_type');

module.exports = ({ invariants }) => {
  // LogicalType = not | and | or
  /**
   * [LogicalType description]
   * @type {Object}
   * @memberof dataclasses
   */
  const LogicalType = {
    not: 'not',
    and: 'and',
    or: 'or',
  };

  // type Predicate = ComparisonPredicate | CompoundPredicate;
  function Predicate(type) {
    return invariants
      .PredicateTypeMustBeValid(type.name, Predicate.Types)
      .then(() => $_type(type.name));
  }

  Predicate.Types = {
    ComparisonPredicate: 'ComparisonPredicate',
    CompoundPredicate: 'CompoundPredicate',
  };

  /**
   * A specialized predicate that you use to compare expressions.
   * @param       {Target} target   [description]
   * @param       {Operator} operator [description]
   * @param       {Object[]} args [description]
   * @return {Promise[ComparisonPredicate]} yield a ComparisonPredicate or a rejected promise
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
   * A specialized predicate that evaluates logical combinations of other predicates.
   * @param       {LogicalType} logic The predicate logic
   * @param       {Array<Predicate>} predicates predicates
   * @return {Promise[CompoundPredicate]} yield a CompoundPredicate or a CompoundPredicateMustHaveAtLeastOneSubPredicate rejected promise
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

  ComparisonPredicate.is = el =>
    el.$_type === Predicate.Types.ComparisonPredicate;
  CompoundPredicate.is = el => el.$_type === Predicate.Types.CompoundPredicate;

  return {
    LogicalType,
    Predicate,
    ComparisonPredicate,
    CompoundPredicate,
  };
};
