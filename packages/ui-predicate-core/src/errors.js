/**
 * Predefined errors that ui-predicate-core will yield from rejected promises
 * @namespace errors
 * @since 1.0.0
 * @note errors are 100% tested from PredicateCore.test.js
 */

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
   * @typedef {Error} InvalidPredicateType
   * @memberof errors
   * @since 1.0.0
   */
  err('InvalidPredicateType'),

  /**
   * Error when someone tried to remove the last remaining predicate from a CompoundPredicate
   * @typedef {Error} CompoundPredicateMustHaveAtLeastOneSubPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('CompoundPredicateMustHaveAtLeastOneSubPredicate'),

  /**
   * Error when setData `data` parameter is called with something else than a CompoundPredicate
   * @typedef {Error} RootPredicateMustBeACompoundPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('RootPredicateMustBeACompoundPredicate'),

  /**
   * Error when `predicate` parameter is called with something else than a ComparisonPredicate
   * @typedef {Error} PredicateMustBeAComparisonPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('PredicateMustBeAComparisonPredicate'),

  /**
   * Error add is called with something else than "after" parameter
   * @typedef {Error} AddCurrentlyOnlySupportAfterInsertion
   * @memberof errors
   * @since 1.0.0
   */
  err('AddCurrentlyOnlySupportAfterInsertion'),

  /**
   * Thrown when a specified target refers to a undefined type.
   * It means the user has missed a type definition in `types`.
   * @typedef {Error} TargetMustReferToADefinedType
   * @memberof errors
   * @since 1.0.0
   */
  err('TargetMustReferToADefinedType'),

  /**
   * Thrown when a user asked for a target change on a predicate
   * but the target_id was invalid because it referred to no existing targets
   * @typedef {Error} Target_idMustReferToADefinedTarget
   * @memberof errors
   * @since 1.0.0
   */
  err('Target_idMustReferToADefinedTarget'),

  /**
   * Thrown when a user asked for a operator change on a predicate
   * but the operator_id was invalid because it referred
   * to no existing operators for the currently selected predicate's target
   * @typedef {Error} Operator_idMustReferToADefinedOperator
   * @memberof errors
   * @since 1.0.0
   */
  err('Operator_idMustReferToADefinedOperator'),

  /**
   * Thrown when remove is called on root CompoundPredicate
   * @typedef {Error} ForbiddenCannotRemoveRootCompoundPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('ForbiddenCannotRemoveRootCompoundPredicate'),

  /**
   * Thrown when remove is called on root CompoundPredicate
   * @typedef {Error} ForbiddenCannotRemoveLastComparisonPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('ForbiddenCannotRemoveLastComparisonPredicate'),

  /**
   * Thrown when remove is called with an invalid type of predicate
   * @typedef {Error} CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate'),

  /**
   * Thrown when add is called with an invalid type of predicate
   * @typedef {Error} CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate
   * @memberof errors
   * @since 1.0.0
   */
  err('CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate'),
]);
