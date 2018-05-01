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

describe('UIPredicateCore', () => {
  describe('constructor', () => {
    it('throw if it did not receive a parameter', () => {
      expect.assertions(1);
      return expect(() => PredicateCore()).toThrow();
    });

    it('throws columns is not an object', () => {
      expect.assertions(1);
      return expect(PredicateCore({ columns: null })).rejects.toMatchSnapshot();
    });

    it('throws if columns does not have minimum required parameters', () => {
      expect.assertions(1);
      return expect(PredicateCore({ columns: {} })).rejects.toMatchSnapshot();
    });

    it('rejects an error if json data does not start with a ComparisonPredicate', () => {
      expect.assertions(1);
      return expect(
        PredicateCore({
          columns: _defaultConfig(),
          data: {
            argument: '',
            operator_id: 'is',
            target_id: 'title',
          },
        })
      ).rejects.toMatchSnapshot();
    });

    it('rejects an error if json data is neither a CompoundPredicate or a ComparisonPredicate', () => {
      expect.assertions(1);
      return expect(
        PredicateCore({
          columns: _defaultConfig(),
          data: {
            listeningTo: 'Match Box Blues - Albert King, Stevie Ray Vaughan',
            at: 'Mon 30 Apr 21:37',
          },
        })
      ).rejects.toMatchSnapshot();
    });

    it('default state (without passed data) should have one predicate, selected automatically', () => {
      expect.assertions(3);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        expect(ctrl.root.predicates[0].target.$type).toBeDefined();
        expect(ctrl.root.predicates[0].target.$type.$operators).toBeDefined();
        expect(ctrl.toJSON()).toMatchSnapshot();
      });
    });

    it('accept a `data` argument', () => {
      const DATA = {
        logicalType_id: 'any',
        predicates: [
          {
            argument: 'welcome',
            operator_id: 'contains',
            target_id: 'title',
          },
          {
            logicalType_id: 'any',
            predicates: [
              {
                argument: 'to',
                operator_id: 'contains',
                target_id: 'title',
              },
              {
                logicalType_id: 'any',
                predicates: [
                  {
                    argument: 'paradise',
                    operator_id: 'contains',
                    target_id: 'title',
                  },
                ],
              },
            ],
          },
        ],
      };

      return PredicateCore({
        columns: _defaultConfig(),
        data: DATA,
      }).then(ctrl => {
        expect(ctrl.toJSON()).toEqual(DATA);
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
            logicalTypes: [],
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

    it('throws if options.getDefaultArgumentComponent is not overriden by the UI Framework adapter', () =>
      PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
        expect(() =>
          ctrl.options.getDefaultArgumentComponent()
        ).toThrowErrorMatchingSnapshot()
      ));

    it('handle options.argumentTypes and expose getArgumentTypeComponentById(argumentType_id) that defaults to getDefaultArgumentComponent if not found', () => {
      expect.assertions(2);
      return PredicateCore({
        columns: {
          // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
          operators: [
            {
              operator_id: 'is',
              label: 'is',
              argumentType_id: 'smallString',
            },
            {
              operator_id: 'contains',
              label: 'Contains',
              argumentType_id: 'smallString',
            },
            {
              operator_id: 'isLowerThan',
              label: '<',
              argumentType_id: 'number',
            },
            {
              operator_id: 'isEqualTo',
              label: '=',
              argumentType_id: 'number',
            },
            {
              operator_id: 'isHigherThan',
              label: '>',
              argumentType_id: 'number',
            },
            {
              operator_id: 'is_date',
              label: 'is',
              argumentType_id: 'datepicker',
            },
            {
              operator_id: 'isBetween_date',
              label: 'is between',
              argumentType_id: 'daterangepicker',
            },
          ],
          types: [
            {
              type_id: 'int',
              operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
            },
            {
              type_id: 'string',
              operator_ids: ['is', 'contains'],
            },
            {
              type_id: 'datetime',
              operator_ids: ['is', 'isBetween'],
            },
          ],
          targets: [
            {
              target_id: 'title',
              label: 'Title',
              type_id: 'string',
            },
            {
              target_id: 'videoCount',
              label: 'Video count',
              type_id: 'int',
            },
            {
              target_id: 'publishedAt',
              label: 'Created at',
              type_id: 'datetime',
            },
          ],
          logicalTypes: [
            {
              logicalType_id: 'any',
              label: 'Any',
            },
            {
              logicalType_id: 'all',
              label: 'All',
            },
            {
              logicalType_id: 'none',
              label: 'None',
            },
          ],
          argumentTypes: [
            {
              argumentType_id: 'datepicker',
              component: () => 1,
            },
            {
              argumentType_id: 'daterangepicker',
              component: () => 2,
            },
            {
              argumentType_id: 'smallString',
              component: () => 3,
            },
            {
              argumentType_id: 'number',
              component: () => 4,
            },
          ],
        },
        options: {
          getDefaultArgumentComponent: function(columns, options) {
            return () => 0;
          },
        },
      }).then(ctrl => {
        // `component` value is a black-box for PredicateCore and can only be understand by
        expect(ctrl.getArgumentTypeComponentById('daterangepicker')()).toBe(2);
        return expect(
          ctrl.getArgumentTypeComponentById('lethavethedefaultone')()
        ).toBe(0);
      });
    });

    it('expose computed options', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        expect(Object.keys(ctrl)).toMatchSnapshot();
      });
    });
  });

  describe('ctrl.add', () => {
    it('rejects if Predicate type is invalid', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
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
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
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
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        expect(
          ctrl.setPredicateTarget_id(null, ctrl.columns.targets[1].target_id)
        ).rejects.toMatchSnapshot();
      });
    });

    it('rejects when target_id refers to a not defined target', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
        expect(
          ctrl.setPredicateTarget_id(ctrl.root.predicates[0], 'blablablabla')
        ).rejects.toMatchSnapshot()
      );
    });

    it('work if we set a predicate to an exist target_id', () => {
      expect.assertions(6);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
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

            expect(firstPredicate.argument).toEqual(null);
            expect(firstPredicate).toMatchSnapshot();
          });
      });
    });
  });

  describe('ctrl.setPredicateOperator_id', () => {
    it('rejects an error if operator_id cannot be found', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        const firstPredicate = ctrl.root.predicates[0];
        return expect(
          ctrl.setPredicateOperator_id(firstPredicate, 'lool')
        ).rejects.toMatchSnapshot();
      });
    });

    it('work if we set a predicate to an existing operator_id', () => {
      expect.assertions(3);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
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

  describe('ctrl.setArgumentValue', () => {
    it('works', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() })
        .then(ctrl =>
          ctrl
            .setArgumentValue(ctrl.root.predicates[0], 'hulk smash!')
            .then(() => ctrl)
        )
        .then(ctrl =>
          expect(ctrl.root.predicates[0].argument).toBe('hulk smash!')
        );
    });
  });

  describe('ctrl.setPredicateLogicalType_id', () => {
    it('yield a rejected promise if logicalType_id cannot be found', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        return expect(
          ctrl.setPredicateLogicalType_id(ctrl.root, 'laaaol')
        ).rejects.toMatchSnapshot();
      });
    });

    it('yield a rejected promise if predicate is not a CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        return expect(
          ctrl.setPredicateLogicalType_id(
            ctrl.root.predicates[0],
            ctrl.columns.logicalTypes[0].logicalType_id
          )
        ).rejects.toMatchSnapshot();
      });
    });

    it('work if we set a predicate to an existing logicalType_id', () => {
      expect.assertions(2);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        expect(ctrl.root.logic.logicalType_id).toBe(
          ctrl.columns.logicalTypes[0].logicalType_id
        );

        return ctrl
          .setPredicateLogicalType_id(
            ctrl.root,
            ctrl.columns.logicalTypes[1].logicalType_id
          )
          .then(() => {
            expect(ctrl.root.logic.logicalType_id).toBe(
              ctrl.columns.logicalTypes[1].logicalType_id
            );
          });
      });
    });
  });

  describe('ctrl.options', () => {
    it('expose computed options', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl => {
        expect(Object.keys(ctrl.options)).toEqual([
          'getDefaultData',
          'getDefaultCompoundPredicate',
          'getDefaultComparisonPredicate',
          'getDefaultLogicalType',
          'getDefaultArgumentComponent',
        ]);
      });
    });

    it('expose computed options', () => {
      expect.assertions(1);
      return PredicateCore({
        columns: _defaultConfig(),
        options: {
          getDefaultArgumentComponent: function() {
            return true;
          },
        },
      }).then(ctrl => {
        expect(ctrl.options.getDefaultArgumentComponent()).toBe(true);
      });
    });
  });

  describe('ctrl.remove(predicate)', () => {
    it('forbids to remove the root CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
        expect(ctrl.remove(ctrl.root)).rejects.toMatchSnapshot()
      );
    });

    it('forbids to remove the last predicate of the root CompoundPredicate', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() }).then(ctrl =>
        expect(ctrl.remove(ctrl.root.predicates[0])).rejects.toMatchSnapshot()
      );
    });

    it('forbids to remove an unknown type of predicate', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() })
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
      return PredicateCore({ columns: _defaultConfig() })
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
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
      expect.assertions(3);
      return PredicateCore({ columns: _defaultConfig() })
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
          ctrl
            .remove(ctrl.root.predicates[1])
            .then(removedPredicate => [
              ctrl,
              comparisonPredicate,
              removedPredicate,
            ])
        )
        .then(([ctrl, comparisonPredicate, removedPredicate]) => {
          expect(ComparisonPredicate.is(removedPredicate)).toBe(true);
          expect(ctrl.root.predicates.length).toBe(1);
          expect(ctrl.root).toMatchSnapshot();
        });
    });

    it(`allow to remove a comparisonPredicate and its parent CompoundPredicate if it was the last comparisonPredicate`, () => {
      expect.assertions(3);
      return PredicateCore({ columns: _defaultConfig() })
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              how: 'after',
              type: 'CompoundPredicate',
            })
            .then(comparisonPredicate => [ctrl, comparisonPredicate])
        )
        .then(([ctrl, comparisonPredicate]) =>
          ctrl
            .remove(ctrl.root.predicates[1].predicates[0]) // remove the comparisonPredicate of the compoundPredicate we've just added
            .then(removedPredicate => [
              ctrl,
              comparisonPredicate,
              removedPredicate,
            ])
        )
        .then(([ctrl, comparisonPredicate, removedPredicate]) => {
          expect(CompoundPredicate.is(removedPredicate)).toBe(true);
          expect(ctrl.root.predicates.length).toBe(1);
          expect(ctrl.root).toMatchSnapshot();
        });
    });
  });

  describe('CompoundPredicate', () => {
    describe('constructor', () => {
      it(`can't be constructed with at least one subpredicate`, () => {
        return expect(
          CompoundPredicate(LogicalType.and, [])
        ).rejects.toMatchSnapshot();
      });
    });
  });

  describe('toJSON', () => {
    it('serialize without special flags', () => {
      expect.assertions(1);
      return PredicateCore({ columns: _defaultConfig() })
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[0],
              type: 'CompoundPredicate',
            })
            .then(() => ctrl)
        )
        .then(ctrl =>
          ctrl
            .add({
              where: ctrl.root.predicates[1].predicates[0],
              type: 'CompoundPredicate',
            })
            .then(() => ctrl)
        )
        .then(ctrl => {
          expect(ctrl.toJSON()).toMatchSnapshot();
        });
    });
  });

  describe('events', () => {
    describe('on', () => {
      it('emits an `changed` event when add() is called', () => {
        expect.assertions(1);
        const listener = jest.fn();
        return PredicateCore({ columns: _defaultConfig() })
          .then(ctrl => {
            ctrl.on('changed', listener);
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            expect(listener.mock.calls.length).toBe(1);
          });
      });
    });

    describe('once', () => {
      it('once() works', () => {
        expect.assertions(1);
        const listener = jest.fn();
        return PredicateCore({ columns: _defaultConfig() })
          .then(ctrl => {
            ctrl.once('changed', listener);
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            expect(listener.mock.calls.length).toBe(1);
          });
      });
    });

    describe('off', () => {
      it('off() works', () => {
        expect.assertions(2);
        const listener = jest.fn();
        const listener2 = jest.fn();
        return PredicateCore({ columns: _defaultConfig() })
          .then(ctrl => {
            ctrl.on('changed', listener);
            ctrl.on('changed', listener2);
            ctrl.off();
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            expect(listener.mock.calls.length).toBe(0);
            expect(listener2.mock.calls.length).toBe(0);
          });
      });

      it('off(eventName) works', () => {
        expect.assertions(2);
        const listener = jest.fn();
        const listener2 = jest.fn();
        return PredicateCore({ columns: _defaultConfig() })
          .then(ctrl => {
            ctrl.on('changed', listener);
            ctrl.on('changed', listener2);
            ctrl.off('changed');
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            expect(listener.mock.calls.length).toBe(0);
            expect(listener2.mock.calls.length).toBe(0);
          });
      });

      it('off(eventName, listener) works', () => {
        expect.assertions(2);
        const listener = jest.fn();
        const listener2 = jest.fn();
        return PredicateCore({ columns: _defaultConfig() })
          .then(ctrl => {
            ctrl.on('changed', listener);
            ctrl.on('changed', listener2);
            ctrl.off('changed', listener2);
            return ctrl
              .add({
                where: ctrl.root.predicates[0],
                type: 'CompoundPredicate',
              })
              .then(() => ctrl);
          })
          .then(ctrl => {
            expect(listener.mock.calls.length).toBe(1);
            expect(listener2.mock.calls.length).toBe(0);
          });
      });
    });
  });
});

function _defaultConfig() {
  return {
    // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
    operators: [
      {
        operator_id: 'is',
        label: 'is',
        argumentType_id: 'smallString',
      },
      {
        operator_id: 'contains',
        label: 'Contains',
        argumentType_id: 'smallString',
      },
      {
        operator_id: 'isLowerThan',
        label: '<',
        argumentType_id: 'number',
      },
      {
        operator_id: 'isEqualTo',
        label: '=',
        argumentType_id: 'number',
      },
      {
        operator_id: 'isHigherThan',
        label: '>',
        argumentType_id: 'number',
      },
      {
        operator_id: 'is_date',
        label: 'is',
        argumentType_id: 'datepicker',
      },
      {
        operator_id: 'isBetween_date',
        label: 'is between',
        argumentType_id: 'daterangepicker',
      },
    ],
    types: [
      {
        type_id: 'int',
        operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
      },
      {
        type_id: 'string',
        operator_ids: ['is', 'contains'],
      },
      {
        type_id: 'datetime',
        operator_ids: ['is', 'isBetween'],
      },
    ],
    targets: [
      {
        target_id: 'title',
        label: 'Title',
        type_id: 'string',
      },
      {
        target_id: 'videoCount',
        label: 'Video count',
        type_id: 'int',
      },
      {
        target_id: 'publishedAt',
        label: 'Created at',
        type_id: 'datetime',
      },
    ],
    logicalTypes: [
      {
        logicalType_id: 'any',
        label: 'Any',
      },
      {
        logicalType_id: 'all',
        label: 'All',
      },
      {
        logicalType_id: 'none',
        label: 'None',
      },
    ],
  };
}
