/**
 * Invariants
 * @namespace invariants
 * @since 1.0.0
 */

const { is } = require('ramda');

module.exports = ({ errors }) => ({
  CompoundPredicateMustHaveAtLeastOneSubPredicate: predicates => {
    if (!Array.isArray(predicates) || predicates.length === 0) {
      throw new errors.CompoundPredicateMustHaveAtLeastOneSubPredicate();
    }
  },

  /**
   * [PredicateTypeMustBeValid description]
   * @param {String} type
   * @param {Object} acceptedTypes [description]
   */
  PredicateTypeMustBeValid: (type, acceptedTypes) => {
    if (!Object.keys(acceptedTypes).includes(type)) {
      throw new errors.InvalidPredicateType();
    }
  },

  RootPredicateMustBeACompoundPredicate: root => {
    if (root.$_type !== 'CompoundPredicate') {
      // @todo use CompoundPredicate.is instead
      throw new errors.RootPredicateMustBeACompoundPredicate();
    }
  },

  PredicateMustBeAComparisonPredicate: root => {
    if (!is(Object, root) || root.$_type !== 'ComparisonPredicate') {
      // @todo use ComparisonPredicate.is instead
      throw new errors.PredicateMustBeAComparisonPredicate();
    }
  },

  AddOnlySupportsAfter: how => {
    if (how !== 'after') {
      throw new errors.AddCurrentlyOnlySupportAfterInsertion();
    }
  },

  TargetMustReferToADefinedType: (type, target) => {
    if (type.isNone()) {
      throw new errors.TargetMustReferToADefinedType(
        `target ${JSON.stringify(
          target.target_id
        )} does not refer to a defined type, target.type_id=${JSON.stringify(
          target.type_id
        )}`
      );
    }
  },
  Target_idMustReferToADefinedTarget: target => {
    if (target.isNone()) {
      throw new errors.Target_idMustReferToADefinedTarget();
    }
  },
  Operator_idMustReferToADefinedOperator: operator => {
    if (operator.isNone()) {
      throw new errors.Operator_idMustReferToADefinedOperator();
    }
  },
});
