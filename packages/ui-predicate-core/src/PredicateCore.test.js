// why? because I HATE ES6 import/export
const {
  PredicateCore,
  dataclasses: {
    Target,
    Operator,
    Predicates,
    CompoundPredicate,
    ComparisonPredicate,
    LogicalType,
  },
  errors,
} = require('..');

const { prop } = require('ramda');

describe('core.component', () => {
  describe('constructor', () => {
    it('throws an error if data does not start with a ComparisonPredicate', () => {
      expect(() => new PredicateCore({ data: [] })).toThrow();
    });

    it('default state (without passed data) should have one predicate, selected automatically', () => {
      const ctrl = new PredicateCore();
      expect(ctrl.root.predicates[0].target.$type).toBeDefined();
      expect(ctrl.root.predicates[0].target.$type.$operators).toBeDefined();
      expect(ctrl.toJSON()).toMatchSnapshot();
    });

    it('check that every targets refer to a defined type', () => {
      expect(
        () =>
          new PredicateCore({
            columns: {
              // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
              operators: [],
              types: [],
              targets: [
                {
                  target_id: 'article.title',
                  label: 'Titre article',
                  type_id: 'string',
                },
              ],
            },
          })
      ).toThrow(errors.TargetMustReferToADefinedType);
    });
  });

  describe('ctrl.add', () => {
    it('throws if Predicate type is invalid', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      expect(() =>
        ctrl.add({
          where: firstPredicate,
          type: 'Blablabla',
        })
      ).toThrow(errors.InvalidPredicateType);
    });

    it('throws if how is unsupported', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      expect(() =>
        ctrl.add({
          where: firstPredicate,
          how: 'insteadof',
          type: 'CompoundPredicate',
        })
      ).toThrow(errors.AddOnlySupportsAfter);
    });

    it('adds a Predicate (a CompoundPredicate) after the first predicate to the root CompoundPredicate - without how parameter', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      ctrl.add({
        where: firstPredicate,
        type: 'CompoundPredicate',
      });

      expect(ctrl.root.predicates.length).toEqual(2);
      expect(CompoundPredicate.is(ctrl.root.predicates[1])).toBe(true);
    });

    it('adds a Predicate (a CompoundPredicate) after the first predicate of the root CompoundPredicate', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      ctrl.add({
        where: firstPredicate,
        how: 'after',
        type: 'CompoundPredicate',
      });

      expect(ctrl.root.predicates.length).toEqual(2);
      expect(CompoundPredicate.is(ctrl.root.predicates[1])).toBe(true);
    });

    it('adds a Predicate (a ComparisonPredicate) after the first predicate of the root CompoundPredicate', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      ctrl.add({
        where: firstPredicate,
        how: 'after',
        type: 'ComparisonPredicate',
      });

      expect(ctrl.root.predicates.length).toEqual(2);
      expect(ComparisonPredicate.is(ctrl.root.predicates[1])).toBe(true);
    });

    it('(currently unsupported) add a Predicate (a ComparisonPredicate) after the CompoundPredicate', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      const compoundPredicate = ctrl.add({
        where: firstPredicate,
        how: 'after',
        type: 'CompoundPredicate',
      });

      expect(CompoundPredicate.is(compoundPredicate)).toBe(true);

      expect(() =>
        ctrl.add({
          where: compoundPredicate,
          how: 'after',
          type: 'ComparisonPredicate',
        })
      ).toThrow('unsupported');
    });

    // it('adds a second Predicate (a ComparisonPredicate) to the root CompoundPredicate', () => {
    //   const ctrl = new PredicateCore();
    //   const firstPredicate = ctrl.root.predicates[0];
    //   ctrl.add({ after: firstPredicate });
    //   expect(ctrl.toJSON()).toMatchSnapshot();
    // });
  });

  describe('ctrl.setPredicateTarget_id', () => {
    it('throws when predicate refers to a invalid predicate', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      expect(() =>
        ctrl.setPredicateTarget_id(null, ctrl.columns.targets[1].target_id)
      ).toThrow(errors.PredicateMustBeAComparisonPredicate);
    });

    it('throws when target_id refers to a not defined target', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      expect(() =>
        ctrl.setPredicateTarget_id(firstPredicate, 'blablablabla')
      ).toThrow(errors.Target_idMustReferToADefinedTarget);
    });

    it('work if we set a predicate to an exist target_id', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];

      expect(firstPredicate.target.target_id).not.toBe(
        ctrl.columns.targets[1].target_id
      );

      expect(firstPredicate.operator.operator_id).not.toBe(
        ctrl.columns.targets[1].$type.$operators[0].operator_id
      );

      ctrl.setPredicateTarget_id(
        firstPredicate,
        ctrl.columns.targets[1].target_id
      );

      // should update target
      expect(firstPredicate.target.target_id).toBe(
        ctrl.columns.targets[1].target_id
      );

      // should update operator as well
      expect(firstPredicate.operator.operator_id).toBe(
        ctrl.columns.targets[1].$type.$operators[0].operator_id
      );

      expect(firstPredicate.arguments).toEqual([]);
      expect(firstPredicate).toMatchSnapshot();
    });
  });

  describe('ctrl.setPredicateOperator_id', () => {
    it('throws an error if operator_id cannot be found', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      expect(() =>
        ctrl.setPredicateOperator_id(firstPredicate, 'lool')
      ).toThrow(errors.Operator_idMustReferToADefinedOperator);
    });

    it('work if we set a predicate to an existing operator_id', () => {
      const ctrl = new PredicateCore();
      const firstPredicate = ctrl.root.predicates[0];
      const target_idBefore = firstPredicate.target.target_id;

      expect(firstPredicate.operator.operator_id).not.toBe(
        firstPredicate.target.$type.$operators[1].operator_id
      );

      ctrl.setPredicateOperator_id(
        firstPredicate,
        firstPredicate.target.$type.$operators[1].operator_id
      );

      // should not update target
      expect(firstPredicate.target.target_id).toBe(target_idBefore);

      // should only update operator
      expect(firstPredicate.operator.operator_id).toBe(
        firstPredicate.target.$type.$operators[1].operator_id
      );
    });
  });

  describe('ctrl.options', () => {
    it('expose computed options', () => {
      const ctrl = new PredicateCore();
      expect(Object.keys(ctrl.options)).toEqual([
        'getDefaultData',
        'getDefaultCompoundPredicate',
        'getDefaultComparisonPredicate',
      ]);
    });
  });

  // describe('ctrl.addCompoundPredicate({after:Predicate})', () => {}

  // describe('ctrl.remove(predicate)', () => {
  //   it('forbids to remove the last predicate of the root CompoundPredicate', () => {
  //     const ctrl = new PredicateCore();
  //     const firstPredicate = ctrl.root.predicates[0];
  //     ctrl.remove(firstPredicate);
  //   });
  // });
});

describe('core.data', () => {
  describe('CompoundPredicate', () => {
    describe('constructor', () => {
      it(`can't be constructed with at least one subpredicate`, () => {
        expect(() => CompoundPredicate(LogicalType.and, [])).toThrow();
      });
    });
  });

  // describe('serializable', () => {
  //   it('serialize a CompoundPredicate with 2 subpredicates', () => {
  //     const root = CompoundPredicate(LogicalType.and, [
  //       ComparisonPredicate(Target(), Operator(), []),
  //       ComparisonPredicate(Target(), Operator(), []),
  //     ]);
  //
  //     expect(JSON.stringify(root)).toMatchSnapshot();
  //   });
  //
  //   it('serialize a CompoundPredicate with subpredicates composed of CompoundPredicate', () => {
  //     const root = CompoundPredicate(LogicalType.and, [
  //       ComparisonPredicate(Target(), Operator(), []),
  //       ComparisonPredicate(Target(), Operator(), []),
  //       CompoundPredicate(LogicalType.and, [
  //         ComparisonPredicate(Target(), Operator(), []),
  //       ]),
  //     ]);
  //
  //     expect(JSON.stringify(root, null, 2)).toMatchSnapshot();
  //   });
  // });

  // describe(`Root CompoundPredicate can't have less (and it child) than 1 Predicate`, () => {
  //   it('works', () => {
  //     const sub1 = ComparisonPredicate(Target(), Operator(), []);
  //     const sub2 = ComparisonPredicate(Target(), Operator(), []);
  //     const root = CompoundPredicate(LogicalType.and, [sub1, sub2]);
  //
  //     root.remove(sub2);
  //     return sub2.remove().then(() => sub.remove());
  //   });
  // });
});
