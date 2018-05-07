/**
 * Invariants
 * @namespace invariants
 * @since 1.0.0
 * @note invariants are 100% tested from PredicateCore.test.js
 */

module.exports = ({ errors, rules }) => ({
  /**
   * [CompoundPredicateMustHaveAtLeastOneSubPredicate description]
   * @param {?Array<Predicate>} predicates list of predicates to add to a CompoundPredicate at creation time
   * @return {Promise<undefined, errors.CompoundPredicateMustHaveAtLeastOneSubPredicate>} resolve the promise if the invariant pass or yield a `CompoundPredicateMustHaveAtLeastOneSubPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  CompoundPredicateMustHaveAtLeastOneSubPredicate: predicates =>
    !Array.isArray(predicates) || predicates.length === 0
      ? Promise.reject(
          new errors.CompoundPredicateMustHaveAtLeastOneSubPredicate()
        )
      : Promise.resolve(),

  /**
   * @param {String} type Predicate type
   * @param {Object} acceptedTypes list of accepted types
   * @return {Promise<undefined, errors.InvalidPredicateType>} resolve the promise if the invariant pass or yield a `InvalidPredicateType` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  PredicateTypeMustBeValid: (type, acceptedTypes) =>
    !Object.keys(acceptedTypes).includes(type)
      ? Promise.reject(new errors.InvalidPredicateType())
      : Promise.resolve(),

  /**
   * @param {dataclasses.CompoundPredicate} root root
   * @param {dataclasses.CompoundPredicate} CompoundPredicate CompoundPredicate
   * @return {Promise<dataclasses.CompoundPredicate, errors.RootPredicateMustBeACompoundPredicate>} resolve the promise if the invariant pass or yield a `RootPredicateMustBeACompoundPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  RootPredicateMustBeACompoundPredicate: (root, CompoundPredicate) =>
    !CompoundPredicate.is(root)
      ? Promise.reject(new errors.RootPredicateMustBeACompoundPredicate())
      : Promise.resolve(root),

  /**
   * @param {dataclasses.Predicate} predicate predicate
   * @param {dataclasses.ComparisonPredicate} ComparisonPredicate ComparisonPredicate constructor
   * @return {Promise<undefined, errors.PredicateMustBeAComparisonPredicate>} resolve the promise if the invariant pass or yield a `PredicateMustBeAComparisonPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */

  PredicateMustBeAComparisonPredicate: (predicate, ComparisonPredicate) =>
    !ComparisonPredicate.is(predicate)
      ? Promise.reject(new errors.PredicateMustBeAComparisonPredicate())
      : Promise.resolve(),

  /**
   * @param {dataclasses.Predicate} predicate predicate
   * @param {dataclasses.CompoundPredicate} CompoundPredicate CompoundPredicate constructor
   * @return {Promise<undefined, errors.PredicateMustBeACompoundPredicate>} resolve the promise if the invariant pass or yield a `PredicateMustBeACompoundPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  PredicateMustBeACompoundPredicate: (predicate, CompoundPredicate) =>
    !CompoundPredicate.is(predicate)
      ? Promise.reject(new errors.PredicateMustBeACompoundPredicate())
      : Promise.resolve(),

  /**
   * @param {string} how how
   * @return {Promise<undefined, errors.AddCurrentlyOnlySupportAfterInsertion>} resolve the promise if the invariant pass or yield a `AddOnlySupportsAfter` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  AddOnlySupportsAfter: how =>
    how !== 'after'
      ? Promise.reject(new errors.AddCurrentlyOnlySupportAfterInsertion())
      : Promise.resolve(),

  /**
   * @param {option<dataclasses.Type>} type type
   * @param {dataclasses.Target} target target
   * @return {Promise<dataclasses.Type, errors.TargetMustReferToADefinedType>} resolve the promise if the invariant pass or yield a `TargetMustReferToADefinedType` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  TargetMustReferToADefinedType: (type, target) => {
    if (type.isNone()) {
      return Promise.reject(
        new errors.TargetMustReferToADefinedType(
          `target ${JSON.stringify(
            target.target_id
          )} does not refer to a defined type, target.type_id=${JSON.stringify(
            target.type_id
          )}`
        )
      );
    }
    return Promise.resolve(type.value());
  },

  /**
   * @param {Option<dataclasses.LogicalType>} logicalType logicalType
   * @return {Promise<dataclasses.LogicalType, errors.LogicalType_idMustReferToADefinedLogicalType>} resolve the promise if the invariant pass or yield a `LogicalType_idMustReferToADefinedLogicalType` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  LogicalType_idMustReferToADefinedLogicalType: logicalType =>
    !logicalType
      ? Promise.reject(
          new errors.LogicalType_idMustReferToADefinedLogicalType()
        )
      : Promise.resolve(logicalType),

  /**
   * @param {Option<dataclasses.Target>} target target
   * @return {Promise<dataclasses.Target, errors.Target_idMustReferToADefinedTarget>} resolve the promise if the invariant pass or yield a `Target_idMustReferToADefinedTarget` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  Target_idMustReferToADefinedTarget: target =>
    !target
      ? Promise.reject(new errors.Target_idMustReferToADefinedTarget())
      : Promise.resolve(target),

  /**
   * @param {Option<dataclasses.Operator>} operator operator
   * @return {Promise<dataclasses.Operator, errors.Operator_idMustReferToADefinedOperator>} resolve the promise if the invariant pass or yield a `Operator_idMustReferToADefinedOperator` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  Operator_idMustReferToADefinedOperator: operator =>
    !operator
      ? Promise.reject(new errors.Operator_idMustReferToADefinedOperator())
      : Promise.resolve(operator),

  /**
   * @param {dataclasses.CompoundPredicate} root root
   * @param {dataclasses.Predicate} predicateToRemove predicateToRemove
   * @return {Promise<predicateToRemove, errors.ForbiddenCannotRemoveRootCompoundPredicate>} resolve the promise if the invariant pass or yield a `ForbiddenCannotRemoveRootCompoundPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  RemovePredicateMustDifferFromRootPredicate: (root, predicateToRemove) =>
    rules.predicateToRemoveIsRootPredicate(root, predicateToRemove)
      ? Promise.reject(new errors.ForbiddenCannotRemoveRootCompoundPredicate())
      : Promise.resolve(predicateToRemove),

  /**
   * @param {dataclasses.CompoundPredicate} root root
   * @param {dataclasses.Predicate} predicateToRemove predicateToRemove
   * @param {dataclasses.CompoundPredicate} CompoundPredicate CompoundPredicate
   * @param {dataclasses.ComparisonPredicate} ComparisonPredicate ComparisonPredicate
   * @return {Promise<undefined, errors.ForbiddenCannotRemoveLastComparisonPredicate>} resolve the promise if the invariant pass or yield a `RootPredicateMustBeACompoundPredicate` error otherwise
   * @memberof invariants
   * @since 1.0.0
   */
  RemovePredicateCannotBeTheLastComparisonPredicate: (
    root,
    predicateToRemove,
    CompoundPredicate,
    ComparisonPredicate
  ) =>
    ComparisonPredicate.is(predicateToRemove) &&
    rules.predicateToRemoveIsTheLastComparisonPredicate(
      root,
      CompoundPredicate,
      ComparisonPredicate
    )
      ? Promise.reject(
          new errors.ForbiddenCannotRemoveLastComparisonPredicate()
        )
      : Promise.resolve(),
});
