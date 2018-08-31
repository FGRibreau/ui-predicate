/* eslint no-unused-vars: "off" */

/**
 * PredicateCore
 * @module core
 * @namespace core
 * @since 1.0.0
 * @note rules are 100% tested from PredicateCore.test.js
 */

const {
  merge,
  find,
  curry,
  pipe,
  filter,
  map,
  takeLast,
  insert,
} = require('ramda');

const option = require('option');

const { EventEmitter } = require('events');

function head(list) {
  return option.fromNullable(list[0]).value();
}

module.exports = function({ dataclasses, invariants, errors, rules, UITypes }) {
  const { CompoundPredicate, ComparisonPredicate, Predicate } = dataclasses;
  /**
   * Get a type by its type_id
   * @param  {array} types types
   * @param  {string} type_id   type id name
   * @return {?dataclasses.Type}  a Type
   * @private
   * @since 1.0.0
   */
  const _getTypeById = (types, type_id) =>
    option.fromNullable(find(type => type.type_id === type_id, types));

  /**
   * Get a target by its target_id
   * @param  {Array<dataclasses.Target>} targets targets
   * @param  {string} target_id target id name
   * @return {Promise<dataclasses.Target, errors.Target_idMustReferToADefinedTarget>}  resolved promise will yield a Target, rejected promise will yield `Target_idMustReferToADefinedTarget` if target_id was not found in `targets`
   * @private
   * @since 1.0.0
   */
  const _getTargetById = (targets, target_id) =>
    invariants.Target_idMustReferToADefinedTarget(
      find(target => target.target_id === target_id, targets)
    );

  /**
   * Get a logical type by its logicalType_id
   * @param  {Array<dataclasses.LogicalType>} logicalTypes logicalTypes
   * @param  {string} logicalType_id logicalType id name
   * @return {Promise<dataclasses.LogicalType, errors.LogicalType_idMustReferToADefinedLogicalType>} resolved promise will yield a LogicalType, rejected promise will yield `LogicalType_idMustReferToADefinedLogicalType` if logicalType was not found in `logicalTypes`.
   * @private
   * @since 1.0.0
   */
  const _getLogicalTypeById = (logicalTypes, logicalType_id) =>
    invariants.LogicalType_idMustReferToADefinedLogicalType(
      find(
        logicalType => logicalType.logicalType_id === logicalType_id,
        logicalTypes
      )
    );

  /**
   * Get an operator by its operator_id
   * @param  {Array<dataclasses.Operator>} operators operators
   * @param  {string[]} operator_id operator_id
   * @return {Promise<dataclasses.Operator, errors.Operator_idMustReferToADefinedOperator>} resolved promise will yield an Operator, rejected promise will yield `Operator_idMustReferToADefinedOperator` if operator was not found in `operators`.
   * @private
   * @since 1.0.0
   */
  const _getOperatorById = (operators, operator_id) =>
    invariants.Operator_idMustReferToADefinedOperator(
      find(operator => operator.operator_id === operator_id, operators)
    );

  /**
   * _getOperatorsByIds
   * @param  {Object} operators operators
   * @param  {string[]} operator_ids operator_ids
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
   * @param  {Function} f function to call
   * @return {Function} function that accept a promise and will call `f`
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
   * @param  {Function} fBefore fBefore
   * @param  {Function} fAfter fAfter
   * @return {Promise} promise from fBefore
   * @private
   */
  const _afterPromise = (fBefore, fAfter) => pipe(fBefore, _tapPromise(fAfter));

  // columns => Promise[columns]
  const _initializeColumns = columns => {
    // at first I used lenses, but the code was way harder to read so it's better that way :)

    // wrap operators
    columns.operators = map(dataclasses.Operator, columns.operators);

    // wrap logicalTypes
    columns.logicalTypes = map(dataclasses.LogicalType, columns.logicalTypes);

    // wrap argumentTypes (allow argumentTypes to be undefined)
    columns.argumentTypes = map(
      dataclasses.ArgumentType,
      columns.argumentTypes || []
    );

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
   * @param       {Object} args Predicate Core parameters
   * @param       {?dataclasses.CompoundPredicate} [args.data=core.defaults.options.getDefaultData] data
   * @param       {Object} [args.columns] columns definition
   * @example <caption>Example of columns definition</caption>
   * // don't forget to take a look at the Storybook https://ui-predicate.fgribreau.com/ui-predicate-vue/latest#/examples
   * {
   * // first define the operator list available along with what type of argument they need
   * operators: [
   *   {
   *     operator_id: 'is',
   *     label: 'is',
   *     argumentType_id: 'smallString',
   *   },
   *   {
   *     operator_id: 'contains',
   *     label: 'Contains',
   *     argumentType_id: 'smallString',
   *   },
   *   {
   *     operator_id: 'isLowerThan',
   *     label: '<',
   *     argumentType_id: 'number',
   *   },
   *   {
   *     operator_id: 'isEqualTo',
   *     label: '=',
   *     argumentType_id: 'number',
   *   },
   *   {
   *     operator_id: 'isHigherThan',
   *     label: '>',
   *     argumentType_id: 'number',
   *   },
   *   {
   *     operator_id: 'is_date',
   *     label: 'is',
   *     argumentType_id: 'datepicker',
   *   },
   *   {
   *     operator_id: 'isBetween_date',
   *     label: 'is between',
   *     argumentType_id: 'daterangepicker',
   *   },
   * ],
   * // then define the type, think of them as aggregate of operators so you can attach them to targets
   * types: [
   *   {
   *     type_id: 'int',
   *     operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
   *   },
   *   {
   *     type_id: 'string',
   *     operator_ids: ['is', 'contains'],
   *   },
   *   {
   *     type_id: 'datetime',
   *     operator_ids: ['is', 'isBetween'],
   *   },
   * ],
   * // finally define targets, don't forget to specify their associated `type_id`
   * targets: [
   *   {
   *     target_id: 'title',
   *     label: 'Title',
   *     type_id: 'string',
   *   },
   *   {
   *     target_id: 'videoCount',
   *     label: 'Video count',
   *     type_id: 'int',
   *   },
   *   {
   *     target_id: 'publishedAt',
   *     label: 'Created at',
   *     type_id: 'datetime',
   *   },
   * ],
   * // define supported logical type
   * logicalTypes: [
   *   {
   *     logicalType_id: 'any',
   *     label: 'Any',
   *   },
   *   {
   *     logicalType_id: 'all',
   *     label: 'All',
   *   },
   *   {
   *     logicalType_id: 'none',
   *     label: 'None',
   *   },
   * ],
   * // (optional) finally define how to display each argumentType_id
   * argumentTypes: [
   *   // here we don't define `component` because it depends on the UI Framework you are using (e.g. Vue, React, Angular, ...)
   *   // since we are in ui-predicate-core here we don't know the UI Framework library that will be used
   *   // read your UI Framework adapter (e.g. ui-predicate-vue) on how to set the component.
   *   // if no argumentType is defined for argumentType_id, then UIPredicateCore will fallback on the default UI component (thanks to getDefaultArgumentComponent)
   *   // { argumentType_id: 'datepicker', component: ? },
   *   // { argumentType_id: 'daterangepicker', component: ? },
   *   // { argumentType_id: 'smallString', component: ? },
   *   // { argumentType_id: 'number', component: ? },
   * ]}
   * @param       {Object} args.columns.operators operators
   * @param       {Object} args.columns.types types
   * @param       {Object} args.columns.targets targets
   * @param       {Object} args.columns.logicalTypes logicalTypes
   * @param       {?Object} args.columns.argumentTypes argumentTypes
   * @param       {Object} [args.options=core.defaults.options] options
   * @return {Promise<core.PredicateCoreAPI, errors<*>>} resolved promise yield Predicate Core public API, rejected promise yield an error {@link errors}
   * @memberof core
   */
  function PredicateCore(args) {
    const { data, columns, ui: _ui, options } = args;

    return new Promise((resolve, reject) => {
      try {
        dataclasses._requireProps(
          columns,
          'operators,logicalTypes,types,targets'
        );
      } catch (err) {
        reject(err);
        return;
      }
      resolve();
    })
      .then(() => _initializeColumns(columns))
      .then(_columns => {
        let _root;
        let _api;
        const _events = new EventEmitter();
        const _options = merge(PredicateCore.defaults.options, options);

        /**
         * Loop through the predicate tree and update flags (e.g. $canBeRemoved)
         * @return {undefined} nothing.
         * @private
         */
        function _apply$flags() {
          const canRemoveAnyPredicate = !rules.predicateToRemoveIsTheLastComparisonPredicate(
            _root,
            CompoundPredicate,
            ComparisonPredicate
          );

          CompoundPredicate.forEach(_root, predicate => {
            predicate.$canBeRemoved =
              canRemoveAnyPredicate &&
              !rules.predicateToRemoveIsRootPredicate(_root, predicate);
          });
        }

        function _emitChangedEvent() {
          _events.emit('changed', _api);
        }

        const _afterWrite = pipe(_apply$flags, _emitChangedEvent);

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
         * @param {object} json user defined JSON
         * @return {Promise<Predicate, errors<*>>} resolved promise yield the root CompoundPredicate, rejected promise yield an errors
         */
        function _fromJSON(json) {
          return Predicate.fromJSON(json, {
            getTargetById: target_id =>
              _getTargetById(_columns.targets, target_id),
            getLogicalTypeById: logicalType_id =>
              _getLogicalTypeById(_columns.logicalTypes, logicalType_id),
            getOperatorById: operator_id =>
              _getOperatorById(_columns.operators, operator_id),
          });
        }

        /**
         * Add a ComparisonPredicate or CompoundPredicate
         * @param  {Object} option option object
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
         * @param  {(dataclasses.ComparisonPredicate|dataclasses.CompoundPredicate)} predicate predicate
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
         * @param {dataclasses.CompoundPredicate} predicate predicate
         * @param {string} newLogicalType_id newLogicalType_id
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
            .then(logicalType => {
              predicate.logic = logicalType;
            });
        }

        /**
         * Change a predicate's target
         * @param {dataclasses.ComparisonPredicate} predicate predicate
         * @param {string} newTarget_id newTarget_id
         * @return {Promise<undefined, errors.PredicateMustBeAComparisonPredicate>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setPredicateTarget_id(predicate, newTarget_id) {
          return (
            invariants
              .PredicateMustBeAComparisonPredicate(
                predicate,
                ComparisonPredicate
              )
              // first change the target
              .then(() => _getTargetById(_columns.targets, newTarget_id))
              .then(target => {
                predicate.target = target;

                // then change the operator to the first operator for this target
                return setPredicateOperator_id(
                  predicate,
                  head(predicate.target.$type.$operators).operator_id
                );
              })
          );
        }

        /**
         * Change a predicate's operator
         * @param {dataclasses.ComparisonPredicate} predicate predicate
         * @param {string} newOperator_id newOperator_id
         * @return {Promise<undefined, errors.Operator_idMustReferToADefinedOperator>} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
         * @memberof core.api
         */
        function setPredicateOperator_id(predicate, newOperator_id) {
          return (
            Promise.resolve()
              // find operator
              .then(() =>
                invariants.Operator_idMustReferToADefinedOperator(
                  predicate.target.$type.$operators.find(
                    operator => operator.operator_id === newOperator_id
                  )
                )
              )

              // change the operator
              .then(operator => {
                predicate.operator = operator;

                // then reset arguments
                predicate.argument = null;
              })
          );
        }

        /**
         * Change a predicate's operator value
         * @param {dataclasses.ComparisonPredicate} predicate predicate
         * @param {*} newValue newValue
         * @return {Promise<undefined>} yield nothing if everything went right, currently everything always go right ;)
         * @since 1.0.0
         * @memberof core.api
         */
        function setArgumentValue(predicate, newValue) {
          return Promise.resolve().then(() => {
            predicate.argument = newValue;
          });
        }

        /**
         * Get a UI Component (e.g. Vue Component) based on the argumentType_id
         * @param {string} argumentType_id the argumentType id to find
         * @return {*} it will either yield the argumentType id associated component or fallback on {@link core.defaults.getArgumentTypeComponentById} to yield the default component
         * @since 1.0.0
         * @memberof core.api
         */
        function getArgumentTypeComponentById(argumentType_id) {
          return option
            .fromNullable(
              _columns.argumentTypes.find(
                argumentType => argumentType.argumentType_id === argumentType_id
              )
            )
            .map(argumentType => argumentType.component)
            .valueOrElse(() =>
              _options.getDefaultArgumentComponent(_columns, _options, _ui)
            );
        }

        /**
         * Get default or overrided ui component
         * @param {ui} name the UIType key to get the right component
         * @return {any} component
         * @since 1.0.0
         * @memberof core.api
         */
        function getUIComponent(name) {
          return ui[name];
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

        /**
         * Yield a serializable object without internal flags ($xxx properties)
         * @example console.log(JSON.stringify(ctrl, null, 2)); // will call ctrl.toJSON() underneath
         * @return {Object} a serializable object
         * @since 1.0.0
         * @memberof core.api
         */
        function toJSON() {
          return Predicate.toJSON(_root);
        }

        /**
         * Adds the `listener` function to the end of the listeners array for the event named `eventName`.
         * No checks are made to see if the `listener` has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
         * @param  {string} eventName available event names are : (`changed`, api)
         * @param  {function} listener listener
         * @return {undefined}
         * @since 1.0.0
         * @memberof core.api
         */
        function on(eventName, listener) {
          _events.on(eventName, listener);
        }

        /**
         * Adds a *one-time* `listener` function for the event named `eventName`. The next time `eventName` is triggered, this `listener` is removed and then invoked.
         * @param  {string} eventName see {@link core.api.on} for available event names
         * @param  {function} listener listener
         * @return {undefined}
         * @see core.api.on
         * @since 1.0.0
         * @memberof core.api
         */
        function once(eventName, listener) {
          _events.once(eventName, listener);
        }

        /**
         * Remove listener(s)
         * If off() will remove every listeners
         * If off(eventName) will only remove listeners to this specific eventName
         * If off(eventName, listener) will remove the `listener` to the `eventName`
         * @param  {?string} eventName see {@link core.api.on} for available event names
         * @param  {?function} listener listener
         * @return {undefined}
         * @since 1.0.0
         * @memberof core.api
         */
        function off(eventName, listener) {
          if (!eventName) {
            // because removeAllListeners treat "undefined" as an event name :facepalm:
            _events.removeAllListeners();
          } else if (!listener) {
            _events.removeAllListeners(eventName);
          } else {
            _events.removeListener(eventName, listener);
          }
        }

        // get data for initialization
        return (
          (data ? _fromJSON(data) : _options.getDefaultData(_columns, _options))
            // setup PredicateCore data
            .then(_afterPromise(setData, _afterWrite))
            // expose public API
            .then(() => {
              /**
               * ui-predicate core public API
               * @typedef {object} PredicateCoreAPI
               * @namespace core.api
               */
              _api = {
                on,
                once,
                off,

                setData: _afterPromise(setData, _afterWrite),
                add: _afterPromise(add, _afterWrite),
                remove: _afterPromise(remove, _afterWrite),
                setPredicateTarget_id: _afterPromise(
                  setPredicateTarget_id,
                  _afterWrite
                ),
                setPredicateOperator_id: _afterPromise(
                  setPredicateOperator_id,
                  _afterWrite
                ),
                setPredicateLogicalType_id: _afterPromise(
                  setPredicateLogicalType_id,
                  _afterWrite
                ),
                setArgumentValue: _afterPromise(setArgumentValue, _afterWrite),

                getArgumentTypeComponentById,

                /**
                 * Enumeration of overridable core ui-predicate component
                 * @enum {String}
                 */
                UITypes,

                /**
                 * Get core UI component (e.g. target selector)
                 * @param {core.ui} ui component name
                 * @return {Object} component
                 * @memberof core.api
                 */
                getUIComponent,
                toJSON,

                /**
                 * Get root CompoundPredicate
                 * @return {dataclasses.CompoundPredicate} root CompoundPredicate
                 * @memberof core.api
                 */
                get root() {
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

              return _api;
            })
        );
      });
  }

  /**
   * Defaults configuration of PredicateCore
   * @type {Object}
   * @namespace core.defaults
   */
  PredicateCore.defaults = {
    /**
     * Defaults options of PredicateCore
     * @type {Object}
     * @namespace core.defaults.options
     */
    options: {
      /**
       * When data is not set at construction time PredicateCore default behavior will be to use the first target and its first operator with empty argument
       * @param  {Object} columns every necessary data class
       * @param  {Object} options PredicateCore available options
       * @return {Promise<dataclasses.CompoundPredicate>}  root CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults.options
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
       * @param  {Object} columns specified columns
       * @param  {Object} options PredicateCore available options
       * @param  {Array<dataclasses.Predicate>} predicates array of predicates to include into the CompoundPredicate
       * @return {Promise<dataclasses.CompoundPredicate>} a CompoundPredicate
       * @since 1.0.0
       * @memberof core.defaults.options
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
       * @memberof core.defaults.options
       */
      getDefaultComparisonPredicate(columns, options) {
        const firstTarget = head(columns.targets);
        return ComparisonPredicate(
          firstTarget,
          head(firstTarget.$type.$operators)
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
       * @memberof core.defaults.options
       */
      getDefaultLogicalType(predicates, columns, options) {
        return Promise.resolve(head(columns.logicalTypes));
      },

      /**
       * Get the default UI component for any argument. Also used if no registered UI component match `argumentType_id`
       * @param  {Object} columns specified columns
       * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
       * @return {*} yield a UI Component (depending on the UI Framework used)
       * @throws if the UI Framework adapter did not override this function. Each UI Framework adapter (e.g. ui-predicate-vue, ui-predicate-react, ...) must implement this and let user override it
       * @memberof core.defaults.options
       */
      getDefaultArgumentComponent(columns, options) {
        throw new errors.UIFrameworkMustImplementgetDefaultArgumentComponent(
          'UIFrameworkMustImplementgetDefaultArgumentComponent'
        );
      },
    },
  };

  return PredicateCore;
};
