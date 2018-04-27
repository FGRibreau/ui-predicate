/**
 * Rules
 * @module core
 * @namespace core
 * @since 1.0.0
 * @note rules are 100% tested from PredicateCore.test.js
 */

const {
  merge,
  find,
  curry,
  prop,
  tap,
  pipe,
  filter,
  map,
  over,
  lens,
  lensPath,
  takeLast,
  set,
  differenceWith,
  lensProp,
  insert,
} = require('ramda');

const option = require('option');

function head(list) {
  return option.fromNullable(list[0]).value();
}

module.exports = function({ dataclasses, invariants, errors, rules }) {
  const {
    CompoundPredicate,
    ComparisonPredicate,
    Predicate,
    Target,
    LogicalType,
  } = dataclasses;

  /**
   * Get a type by its type_id
   * @param  {array} types
   * @param  {string} type_id   type id name
   * @return {?Type}  a Type
   * @private
   * @since 1.0.0
   */
  const _getTypeById = (types, type_id) =>
    option.fromNullable(find(type => type.type_id == type_id, types));

  /**
   * Get a target by its target_id
   * @param  {array} targets
   * @param  {string} target_id target id name
   * @return {?dataclasses.Target}
   * @private
   * @since 1.0.0
   */
  const _getTargetById = (targets, target_id) =>
    option.fromNullable(find(target => target.target_id == target_id, targets));

  /**
   * Get a logical type by its logicalType_id
   * @param  {array} logicalTypes
   * @param  {string} logicalType_id logicalType id name
   * @return {?dataclasses.Target}
   * @private
   * @since 1.0.0
   */
  const _getLogicalTypeById = (logicalTypes, logicalType_id) =>
    option.fromNullable(
      find(
        logicalType => logicalType.logicalType_id == logicalType_id,
        logicalTypes
      )
    );

  /**
   * _getOperatorsByIds
   * @param  {Object} columns
   * @param  {string[]} operator_ids
   * @return {Array<dataclasses.operator>}
   * @private
   * @since 1.0.0
   */
  const _getOperatorsByIds = curry((operators, operator_ids) =>
    pipe(filter(({ operator_id }) => operator_ids.includes(operator_id)))(
      operators
    )
  );

  const _set$operatorsToType = curry((columns, type) => {
    type.$operators = _getOperatorsByIds(columns.operators, type.operator_ids);
    return type;
  });

  const _set$typeToTarget = curry((columns, target) => {
    const typeOption = _getTypeById(columns.types, target.type_id);
    return invariants
      .TargetMustReferToADefinedType(typeOption, target)
      .then(type => {
        target.$type = type;
        return target;
      });
  });

  /**
   * Tap for Promise
   * @param  {Function} f
   * @return {Function}
   * @private
   */
  const _tapPromise = f => {
    return function(promise) {
      return promise.then(result => {
        f();
        return result;
      });
    };
  };

  /**
   * Run `fAfter()` (without any arguments) after `fBefore`, it will yield the promise yield from fBefore
   * @param  {Function} fBefore
   * @param  {Function} fAfter
   * @return {Promise} promise from fBefore
   * @private
   */
  const _afterPromise = (fBefore, fAfter) => pipe(fBefore, _tapPromise(fAfter));

  // columns => Promise[columns]
  const initializeColumns = columns => {
    // at first I used lenses, but the code was way harder to read so it's better that way :)

    // wrap operators
    columns.operators = map(dataclasses.Operator, columns.operators);

    // wrap logicalTypes
    columns.logicalTypes = map(dataclasses.LogicalType, columns.logicalTypes);

    // wrap types and set `$operators` attribute on each type
    const wrapType = pipe(dataclasses.Type, _set$operatorsToType(columns));
    columns.types = map(wrapType, columns.types);

    // wrap targets and set `$type` attribut on each target
    const wrapTarget = pipe(dataclasses.Target, _set$typeToTarget(columns));
    return Promise.all(map(wrapTarget, columns.targets)).then(targets => {
      columns.targets = targets;
      return columns;
    });
  };

  /**
   * Create a new PredicateCore
   * @param       {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData]
   * @param       {Object} [columns=PredicateCore.defaults.columns]
   * @param       {Object} [options=PredicateCore.defaults.options]
   * @return {Promise<core.PredicateCoreAPI>}
   * @memberof core
   */
  function PredicateCore({ data, columns, options } = {}) {
    return initializeColumns(columns || PredicateCore.defaults.columns).then(
      _columns => {
        let _root;
        const _options = merge(PredicateCore.defaults.options, options);

        /**
         * Loop through the predicate tree and update flags (e.g. $canBeRemoved)
         * @private
         */
        function _apply$flags() {
          const canRemoveAnyPredicate = !rules.predicateToRemoveIsTheLastComparisonPredicate(
            _root,
            CompoundPredicate,
            ComparisonPredicate
          );

          CompoundPredicate.forEach(_root, function(predicate) {
            predicate.$canBeRemoved =
              canRemoveAnyPredicate &&
              !rules.predicateToRemoveIsRootPredicate(_root, predicate);
          });
        }

        /**
         * Set PredicateCore data
         * @param {dataclasses.CompoundPredicate} root CompoundPredicate
         * @return {Promise<undefined, errors.RootPredicateMustBeACompoundPredicate>} resolved promise yield nothing, rejected promise yield RootPredicateMustBeACompoundPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setData(root) {
          return invariants
            .RootPredicateMustBeACompoundPredicate(root, CompoundPredicate)
            .then(() => {
              _root = root;
            });
        }

        /**
         * Add a ComparisonPredicate or CompoundPredicate
         * @param  {Object} option
         * @param  {string} options.type what type of Predicate to add
         * @param  {string} [options.how=after] should we insert it before, after or instead of? (currently only after is supported)
         * @param  {dataclasses.Predicate} options.where current element
         * @return {Promise<dataclasses.Predicate>} inserted predicate
         * @since 1.0.0
         * @memberof core.api
         */
        function add({ where, how = 'after', type }) {
          // currently only after is supported
          return (
            Promise.resolve()
              .then(() => invariants.AddOnlySupportsAfter(how))
              .then(() =>
                invariants.PredicateTypeMustBeValid(type, Predicate.Types)
              )
              // generate the Predicates
              .then(() => _options[`getDefault${type}`](_columns, _options))
              // then add it
              .then(predicate => {
                const isComparisonPredicate = ComparisonPredicate.is(where);

                if (isComparisonPredicate || CompoundPredicate.is(where)) {
                  if (isComparisonPredicate) {
                    // it's a comparisonpredicate
                    // first find predicates array that contains the element
                    const path = _find(where);
                    // we are starting from a ComparisonPredicate that always live inside a CompoundPredicate.predicates array
                    const [compoundpredicate, [_, index]] = takeLast(2, path);
                    compoundpredicate.predicates = insert(
                      index + 1,
                      predicate,
                      compoundpredicate.predicates
                    );
                  } else {
                    // it's a compoundpredicate
                    // we want to add a CompoundPredicate after a compound predicate
                    // so we need to add it as its first .predicates entry
                    where.predicates.unshift(predicate);
                  }

                  return predicate;
                }

                return Promise.reject(
                  new errors.CannotAddSomethingElseThanACompoundPredicateOrAComparisonPredicate()
                );
              })
          );
        }

        /**
         * Remove a ComparisonPredicate or CompoundPredicate
         * @param  {(dataclasses.ComparisonPredicate|dataclasses.CompoundPredicate)} predicate
         * @return {Promise<dataclasses.Predicate>} yield the removed predicate, will reject the promise if remove was called with the root CompoundPredicate or the last ComparisonPredicate of the root CompoundPredicate
         * @since 1.0.0
         * @memberof core.api
         */
        function remove(predicate) {
          return Promise.resolve()
            .then(() =>
              invariants.RemovePredicateMustDifferFromRootPredicate(
                _root,
                predicate
              )
            )
            .then(() =>
              invariants.RemovePredicateCannotBeTheLastComparisonPredicate(
                _root,
                predicate,
                CompoundPredicate,
                ComparisonPredicate
              )
            )
            .then(() => {
              if (
                CompoundPredicate.is(predicate) ||
                ComparisonPredicate.is(predicate)
              ) {
                const path = _find(predicate);
                // we are starting from a ComparisonPredicate that always live
                // inside a CompoundPredicate.predicates array
                const [parentCompoundpredicate, [_, index]] = takeLast(2, path);
                parentCompoundpredicate.predicates.splice(index, 1);

                if (parentCompoundpredicate.predicates.length === 0) {
                  // if there are not any more predicates
                  // inside the parentCompoundpredicate, we should also remove it
                  return remove(parentCompoundpredicate);
                }

                return predicate;
              }

              return Promise.reject(
                new errors.CannotRemoveSomethingElseThanACompoundPredicateOrAComparisonPredicate()
              );
            });
        }

        /**
         * Change a CompoundPredicate logical
         * @param {dataclasses.CompoundPredicate} predicate
         * @param {string} newLogicalType_id
         * @return {Promise<undefined, errors.PredicateMustBeACompoundPredicate>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeACompoundPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setPredicateLogicalType_id(predicate, newLogicalType_id) {
          return invariants
            .PredicateMustBeACompoundPredicate(predicate, CompoundPredicate)
            .then(() => {
              // first change the logical type
              return _getLogicalTypeById(
                _columns.logicalTypes,
                newLogicalType_id
              );
            })
            .then(logicalTypeOption =>
              invariants.LogicalType_idMustReferToADefinedLogicalType(
                logicalTypeOption
              )
            )
            .then(logicalTypeOption => {
              predicate.logic = logicalTypeOption.value(); // safe
            });
        }

        /**
         * Change a predicate's target
         * @param {dataclasses.ComparisonPredicate} predicate
         * @param {string} newTarget_id
         * @return {Promise} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setPredicateTarget_id(predicate, newTarget_id) {
          return invariants
            .PredicateMustBeAComparisonPredicate(predicate, ComparisonPredicate)
            .then(() => {
              // first change the target
              return _getTargetById(_columns.targets, newTarget_id);
            })
            .then(targetOption =>
              invariants.Target_idMustReferToADefinedTarget(targetOption)
            )
            .then(targetOption => {
              predicate.target = targetOption.value(); // safe

              // then change the operator to the first operator for this target
              return setPredicateOperator_id(
                predicate,
                head(predicate.target.$type.$operators).operator_id
              );
            });
        }

        /**
         * Change a predicate's operator
         * @param {dataclasses.ComparisonPredicate} predicate
         * @param {string} newTarget_id
         * @return {Promise<undefined, errors.PredicateMustBeAComparisonPredicate>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setPredicateOperator_id(predicate, newOperator_id) {
          return (
            Promise.resolve()
              // find operator
              .then(() =>
                option.fromNullable(
                  predicate.target.$type.$operators.find(
                    operator => operator.operator_id === newOperator_id
                  )
                )
              )

              .then(operatorOption =>
                invariants.Operator_idMustReferToADefinedOperator(
                  operatorOption
                )
              )
              // change the operator
              .then(operatorOption => {
                predicate.operator = operatorOption.value(); // safe

                // then reset arguments to array
                predicate.arguments = [];
              })
          );
        }

        /**
         * Compute the JSON pointer path the element
         * @param  {Object} element (http://jsonpatch.com/)
         * @return {?Array} null if not found
         * @readonly
         * @since 1.0.0
         */
        function _find(element) {
          return CompoundPredicate.reduce(
            _root,
            (acc, predicate, parents) => {
              return element === predicate ? parents : acc;
            },
            null
          );
        }

        // get data for initialization
        return (
          (data
            ? Promise.resolve(data)
            : _options.getDefaultData(_columns, _options)
          )
            // setup PredicateCore data
            .then(_afterPromise(setData, _apply$flags))
            // expose public API
            .then(() => {
              /**
               * ui-predicate core public API
               * @typedef {object} PredicateCoreAPI
               * @namespace core.api
               */
              return {
                setData: _afterPromise(setData, _apply$flags),
                add: _afterPromise(add, _apply$flags),
                remove: _afterPromise(remove, _apply$flags),
                setPredicateTarget_id: _afterPromise(
                  setPredicateTarget_id,
                  _apply$flags
                ),
                setPredicateOperator_id: _afterPromise(
                  setPredicateOperator_id,
                  _apply$flags
                ),
                setPredicateLogicalType_id: _afterPromise(
                  setPredicateLogicalType_id,
                  _apply$flags
                ),

                /**
                 * Get root CompoundPredicate
                 * @return {dataclasses.CompoundPredicate}
                 * @memberof core.api
                 */
                get root() {
                  return _root;
                },

                toJSON() {
                  return _root;
                },

                // used for testing
                get columns() {
                  return _columns;
                },

                // used for testing
                get options() {
                  return _options;
                },
              };
            })
        );
      }
    );
  }

  /**
   * Defaults configuration of PredicateCore
   * @type {Object}
   * @namespace core.defaults
   */
  PredicateCore.defaults = {
    options: {
      /**
       * When data is not set at construction time PredicateCore default behavior will be to use the first target and its first operator with empty argument
       * @param  {Object} dataclasses every necessary data class
       * @param  {Object} columns every necessary data class
       * @param  {Object} options PredicateCore available options
       * @return {Promise<dataclasses.CompoundPredicate>}  root CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultData(columns, options) {
        return options
          .getDefaultComparisonPredicate(columns, options)
          .then(comparisonPredicate => {
            return options.getDefaultCompoundPredicate(columns, options, [
              comparisonPredicate,
            ]);
          });
      },

      /**
       * Default compount predicate to use
       *
       * This function is called whenever a new CompoundPredicate is added to the UIPredicate
       * @param  {Array<dataclasses.Predicate>} predicates
       * @param  {Object} columns specified columns
       * @param  {Object} options PredicateCore available options
       * @return {Promise<dataclasses.CompoundPredicate>} a CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultCompoundPredicate(columns, options, predicates) {
        return (!Array.isArray(predicates) || predicates.length === 0
          ? options
              .getDefaultComparisonPredicate(columns, options)
              .then(comparisonPredicate => [comparisonPredicate])
          : Promise.resolve(predicates)
        ).then(predicates =>
          options
            .getDefaultLogicalType(predicates, columns, options)
            .then(logicalType => CompoundPredicate(logicalType, predicates))
        );
      },

      /**
       * Default comparison predicate to use
       *
       * This function is called whenever a new ComparisonPredicate is added to the UIPredicate
       * @param  {Object} columns specified columns
       * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
       * @return {Promise<dataclasses.ComparisonPredicate>} a Comparison
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultComparisonPredicate(columns, options) {
        const firstTarget = head(columns.targets);
        return ComparisonPredicate(
          firstTarget,
          head(firstTarget.$type.$operators),
          []
        );
      },

      /**
       * Default logical type to use when a new comparison predicate is created
       *
       * This function is called whenever a new ComparisonPredicate is added to the UIPredicate
       * @param  {Array<dataclasses.Predicate>} predicates specified columns
       * @param  {Object} columns specified columns
       * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
       * @return {Promise<dataclasses.LogicalType>} a logical type
       * @since 1.0.0
       * @memberof core.defaults
       */
      getDefaultLogicalType(predicates, columns, options) {
        return Promise.resolve(head(columns.logicalTypes));
      },
    },
    columns: {
      // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
      operators: [
        {
          operator_id: 'is',
          label: 'Est',
        },
        {
          operator_id: 'contains',
          label: 'Contient',
        },
        {
          operator_id: 'isLowerThan',
          label: '<',
        },
        {
          operator_id: 'isEqualTo',
          label: '=',
        },
        {
          operator_id: 'isHigherThan',
          label: '>',
        },
        {
          operator_id: 'isBetween',
          label: 'est compris entre',
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
          target_id: 'article.title',
          label: 'Titre article',
          type_id: 'string',
        },
        {
          target_id: 'videoCount',
          label: 'Nombre de vidéo',
          type_id: 'int',
        },
        {
          target_id: 'publishingAt',
          label: 'Date de publication',
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
    },
  };

  return PredicateCore;
};
