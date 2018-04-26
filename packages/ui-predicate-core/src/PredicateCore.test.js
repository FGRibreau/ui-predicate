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
    it('rejects an error if data does not start with a ComparisonPredicate', () => {
      expect.assertions(1);
      return expect(PredicateCore({ data: [] })).rejects.toMatchSnapshot();
    });

    it('default state (without passed data) should have one predicate, selected automatically', () => {
      expect.assertions(3);
      return PredicateCore().then(ctrl => {
        expect(ctrl.root.predicates[0].target.$type).toBeDefined();
        expect(ctrl.root.predicates[0].target.$type.$operators).toBeDefined();
        expect(ctrl.toJSON()).toMatchSnapshot();
      });
    });

    it('check that every targets refer to a defined type', () => {
      expect.assertions(1);
      return expect(
        PredicateCore({
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
      ).rejects.toMatchSnapshot();
    });
  });

  describe('ctrl.add', () => {
    it('rejects if Predicate type is invalid', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(
          ctrl.add({
            where: ctrl.root.predicates[0],
            type: 'blablabla',
          })
        ).rejects.toMatchSnapshot()
      );
    });

    it('rejects if `how` is unsupported', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(
          ctrl.add({
            where: ctrl.root.predicates[0],
            how: 'insteadof',
            type: 'CompoundPredicate',
          })
        ).rejects.toMatchSnapshot()
      );
    });

    it('rejects if where is unsupported', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(
          ctrl.add({
            where: {},
            how: 'after',
            type: 'CompoundPredicate',
          })
        ).rejects.toMatchSnapshot()
      );
    });

    it('adds a second Predicate (a ComparisonPredicate) to the root CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              type: 'ComparisonPredicate',
            })
            .then(compoundPredicate => ctrl)
        )
        .then(ctrl => expect(ctrl.toJSON()).toMatchSnapshot());
    });

    it('adds a Predicate (a CompoundPredicate) after the first predicate to the root CompoundPredicate - without how parameter', () => {
      expect.assertions(3);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              type: 'CompoundPredicate',
            })
            .then(compoundPredicate => [ctrl, compoundPredicate])
        )
        .then(([ctrl, compoundPredicate]) => {
          expect(ctrl.root.predicates.length).toEqual(2);
          expect(CompoundPredicate.is(compoundPredicate)).toBe(true);
          expect(CompoundPredicate.is(ctrl.root.predicates[1])).toBe(true);
        });
    });

    it('adds a Predicate (a CompoundPredicate) after the first predicate of the root CompoundPredicate', () => {
      expect.assertions(3);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'CompoundPredicate',
            })
            .then(compoundPredicate => [ctrl, compoundPredicate])
        )
        .then(([ctrl, compoundPredicate]) => {
          expect(ctrl.root.predicates.length).toEqual(2);
          expect(CompoundPredicate.is(compoundPredicate)).toBe(true);
          expect(CompoundPredicate.is(ctrl.root.predicates[1])).toBe(true);
        });
    });

    it('adds a Predicate (a ComparisonPredicate) after the first predicate of the root CompoundPredicate', () => {
      expect.assertions(2);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'ComparisonPredicate',
            })
            .then(comparisonPredicate => [ctrl, comparisonPredicate])
        )
        .then(([ctrl, comparisonPredicate]) => {
          expect(ctrl.root.predicates.length).toEqual(2);
          expect(ComparisonPredicate.is(ctrl.root.predicates[1])).toBe(true);
        });
    });

    it('Add a Predicate (a ComparisonPredicate) after a CompoundPredicate', () => {
      expect.assertions(3);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              type: 'CompoundPredicate',
            })
            .then(compoundPredicate => [ctrl, compoundPredicate])
        )
        .then(([ctrl, compoundPredicate]) => {
          expect(compoundPredicate.predicates.length).toEqual(1);

          return ctrl
            .add({
              where: compoundPredicate,
              type: 'ComparisonPredicate',
            })
            .then(predicate => [ctrl, predicate, compoundPredicate]);
        })
        .then(([ctrl, predicate, compoundPredicate]) => {
          expect(ComparisonPredicate.is(predicate)).toBe(true);
          expect(compoundPredicate.predicates.length).toEqual(2);
        });
    });

    it('Add a Predicate (a CompoundPredicate) after a ComparisonPredicate', () => {
      expect.assertions(3);
      return PredicateCore()
        .then(ctrl => {
          const firstPredicate = ctrl.root.predicates[0];
          return ctrl
            .add({
              where: firstPredicate,
              type: 'CompoundPredicate',
            })
            .then(compoundPredicate => [ctrl, compoundPredicate]);
        })
        .then(([ctrl, compoundPredicate]) => {
          expect(compoundPredicate.predicates.length).toEqual(1);

          return ctrl
            .add({
              where: compoundPredicate,
              type: 'CompoundPredicate',
            })
            .then(() => [ctrl, compoundPredicate]);
        })
        .then(([ctrl, compoundPredicate]) => {
          expect(CompoundPredicate.is(compoundPredicate.predicates[0])).toBe(
            true
          );

          return ctrl
            .add({
              where: compoundPredicate.predicates[1],
              type: 'ComparisonPredicate',
            })
            .then(comparisonPredicate =>
              expect(ComparisonPredicate.is(comparisonPredicate)).toBe(true)
            );
        });
    });
  });

  describe('ctrl.setPredicateTarget_id', () => {
    it('rejects when predicate refers to a invalid predicate', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl => {
        expect(
          ctrl.setPredicateTarget_id(null, ctrl.columns.targets[1].target_id)
        ).rejects.toMatchSnapshot();
      });
    });

    it('rejects when target_id refers to a not defined target', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(
          ctrl.setPredicateTarget_id(ctrl.root.predicates[0], 'blablablabla')
        ).rejects.toMatchSnapshot()
      );
    });

    it('work if we set a predicate to an exist target_id', () => {
      expect.assertions(6);
      return PredicateCore().then(ctrl => {
        const firstPredicate = ctrl.root.predicates[0];

        expect(firstPredicate.target.target_id).not.toBe(
          ctrl.columns.targets[1].target_id
        );

        expect(firstPredicate.operator.operator_id).not.toBe(
          ctrl.columns.targets[1].$type.$operators[0].operator_id
        );

        return ctrl
          .setPredicateTarget_id(
            firstPredicate,
            ctrl.columns.targets[1].target_id
          )
          .then(() => {
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
    });
  });

  describe('ctrl.setPredicateOperator_id', () => {
    it('rejects an error if operator_id cannot be found', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl => {
        const firstPredicate = ctrl.root.predicates[0];
        return expect(
          ctrl.setPredicateOperator_id(firstPredicate, 'lool')
        ).rejects.toMatchSnapshot();
      });
    });

    it('work if we set a predicate to an existing operator_id', () => {
      expect.assertions(3);
      return PredicateCore().then(ctrl => {
        const firstPredicate = ctrl.root.predicates[0];
        const target_idBefore = firstPredicate.target.target_id;

        expect(firstPredicate.operator.operator_id).not.toBe(
          firstPredicate.target.$type.$operators[1].operator_id
        );

        return ctrl
          .setPredicateOperator_id(
            firstPredicate,
            firstPredicate.target.$type.$operators[1].operator_id
          )
          .then(() => {
            // should not update target
            expect(firstPredicate.target.target_id).toBe(target_idBefore);

            // should only update operator
            expect(firstPredicate.operator.operator_id).toBe(
              firstPredicate.target.$type.$operators[1].operator_id
            );
          });
      });
    });
  });

  describe('ctrl.options', () => {
    it('expose computed options', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl => {
        expect(Object.keys(ctrl.options)).toEqual([
          'getDefaultData',
          'getDefaultCompoundPredicate',
          'getDefaultComparisonPredicate',
        ]);
      });
    });
  });

  describe('ctrl.remove(predicate)', () => {
    it('forbids to remove the root CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(ctrl.remove(ctrl.root)).rejects.toMatchSnapshot()
      );
    });

    it('forbids to remove the last predicate of the root CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore().then(ctrl =>
        expect(ctrl.remove(ctrl.root.predicates[0])).rejects.toMatchSnapshot()
      );
    });

    it('forbids to remove an unknown type of predicate', () => {
      expect.assertions(1);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'ComparisonPredicate',
            })
            .then(comparisonPredicate => [ctrl, comparisonPredicate])
        )
        .then(([ctrl, comparisonPredicate]) =>
          expect(ctrl.remove({})).rejects.toMatchSnapshot()
        );
    });

    it('allow to remove a compoundpredicate', () => {
      expect.assertions(2);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'CompoundPredicate',
            })
            .then(compoundPredicate => [ctrl, compoundPredicate])
        )
        .then(([ctrl, compoundPredicate]) =>
          ctrl
            .remove(compoundPredicate)
            .then(removedPredicate => [
              ctrl,
              compoundPredicate,
              removedPredicate,
            ])
        )
        .then(([ctrl, compoundPredicate, removedPredicate]) => {
          expect(removedPredicate).toMatchSnapshot();
          expect(ctrl.root.predicates.length).toBe(1);
        });
    });

    it('allow to remove a comparisonPredicate', () => {
      expect.assertions(2);
      return PredicateCore()
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'ComparisonPredicate',
            })
            .then(comparisonPredicate => [ctrl, comparisonPredicate])
        )
        .then(([ctrl, comparisonPredicate]) => {
          expect(ctrl.remove(comparisonPredicate)).resolves.toMatchSnapshot();
          expect(ctrl.root.predicates.length).toBe(1);
        });
    });
  });
});

describe('core.data', () => {
  describe('CompoundPredicate', () => {
    describe('constructor', () => {
      it(`can't be constructed with at least one subpredicate`, () => {
        return expect(
          CompoundPredicate(LogicalType.and, [])
        ).rejects.toMatchSnapshot();
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
