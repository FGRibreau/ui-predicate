const { mergeAll } = require('ramda');
const errorEx = require('error-ex');

function err(name) {
  return {
    [name]: errorEx(name),
  };
}

module.exports = mergeAll([
  /**
   * Error when a Predicate is created without
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('InvalidPredicateType'),

  /**
   * Error when someone tried to remove the last remaining predicate from a CompoundPredicate
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('CompoundPredicateMustHaveAtLeastOneSubPredicate'),

  /**
   * Error when setData `data` parameter is called with something else than a CompoundPredicate
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('RootPredicateMustBeACompoundPredicate'),

  /**
   * Error when `predicate` parameter is called with something else than a ComparisonPredicate
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('PredicateMustBeAComparisonPredicate'),

  /**
   * Error add is called with something else than "after" parameter
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('AddCurrentlyOnlySupportAfterInsertion'),

  /**
   * Thrown when a specified target refers to a undefined type.
   * It means the user has missed a type definition in `types`.
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('TargetMustReferToADefinedType'),

  /**
   * Thrown when a user asked for a target change on a predicate
   * but the target_id was invalid because it referred to no existing targets
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('Target_idMustReferToADefinedTarget'),
  /**
   * Thrown when a user asked for a operator change on a predicate
   * but the operator_id was invalid because it referred
   * to no existing operators for the currently selected predicate's target
   * @type {Error}
   * @memberof Errors
   * @since 1.0.0
   */
  err('Operator_idMustReferToADefinedOperator'),
]);
