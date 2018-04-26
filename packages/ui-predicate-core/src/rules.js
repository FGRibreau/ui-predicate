module.exports = {
  /**
   * @param {CompoundPredicate} root      root predicate
   * @param {Predicate} predicateToRemove predicate to remove
   * @return {boolean} true if the predicate to remove is the root predicate
   */
  predicateToRemoveIsRootPredicate: (root, predicateToRemove) => {
    return root === predicateToRemove;
  },

  /**
   * @param {CompoundPredicate} root      root predicate
   * @param {Predicate} predicateToRemove predicate to remove
   * @param {Function} CompoundPredicate CompoundPredicate constructor function
   * @param {Function} ComparisonPredicate ComparisonPredicate constructor function
   * @return {boolean} true if the predicate to remove is the last ComparisonPredicate
   */
  predicateToRemoveIsTheLastComparisonPredicate: (
    root,
    CompoundPredicate,
    ComparisonPredicate
  ) => {
    const comparisonPredicateCount = CompoundPredicate.reduce(
      root,
      (acc, el) => (ComparisonPredicate.is(el) ? acc + 1 : acc),
      0
    );

    return comparisonPredicateCount === 1;
  },
};
