/**
 * Invariants
 * @namespace invariants
 * @since 1.0.0
 * @note invariants are 100% tested from PredicateCore.test.js
 */

const { is } = require('ramda');

module.exports = ({ errors, rules }) => ({
  CompoundPredicateMustHaveAtLeastOneSubPredicate: predicates => {
    if (!Array.isArray(predicates) || predicates.length === 0) {
      return Promise.reject(
        new errors.CompoundPredicateMustHaveAtLeastOneSubPredicate()
      );
    }
    return Promise.resolve();
  },

  /**
   * [PredicateTypeMustBeValid description]
   * @param {String} type
   * @param {Object} acceptedTypes [description]
   */
  PredicateTypeMustBeValid: (type, acceptedTypes) => {
    if (!Object.keys(acceptedTypes).includes(type)) {
      return Promise.reject(new errors.InvalidPredicateType());
    }

    return Promise.resolve();
  },

  RootPredicateMustBeACompoundPredicate: root => {
    if (root.$_type !== 'CompoundPredicate') {
      // @todo use CompoundPredicate.is instead
      return Promise.reject(new errors.RootPredicateMustBeACompoundPredicate());
    }
    return Promise.resolve(root);
  },

  PredicateMustBeAComparisonPredicate: root => {
    if (!is(Object, root) || root.$_type !== 'ComparisonPredicate') {
      // @todo use ComparisonPredicate.is instead
      return Promise.reject(new errors.PredicateMustBeAComparisonPredicate());
    }
    return Promise.resolve();
  },

  AddOnlySupportsAfter: how => {
    if (how !== 'after') {
      return Promise.reject(new errors.AddCurrentlyOnlySupportAfterInsertion());
    }

    return Promise.resolve();
  },

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
  Target_idMustReferToADefinedTarget: target => {
    if (target.isNone()) {
      return Promise.reject(new errors.Target_idMustReferToADefinedTarget());
    }
    return Promise.resolve(target);
  },
  Operator_idMustReferToADefinedOperator: operator => {
    if (operator.isNone()) {
      return Promise.reject(
        new errors.Operator_idMustReferToADefinedOperator()
      );
    }
    return Promise.resolve(operator);
  },

  RemovePredicateMustDifferFromRootPredicate: (root, predicateToRemove) => {
    if (rules.predicateToRemoveIsRootPredicate(root, predicateToRemove)) {
      return Promise.reject(
        new errors.ForbiddenCannotRemoveRootCompoundPredicate()
      );
    }

    return Promise.resolve(predicateToRemove);
  },

  RemovePredicateCannotBeTheLastComparisonPredicate: (
    root,
    predicateToRemove,
    CompoundPredicate,
    ComparisonPredicate
  ) => {
    if (
      ComparisonPredicate.is(predicateToRemove) &&
      rules.predicateToRemoveIsTheLastComparisonPredicate(
        root,
        CompoundPredicate,
        ComparisonPredicate
      )
    ) {
      return Promise.reject(
        new errors.ForbiddenCannotRemoveLastComparisonPredicate()
      );
    }

    return Promise.resolve();
  },
});
