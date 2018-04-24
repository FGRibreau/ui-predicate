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
  lensProp,
  insert,
} = require('ramda');

const option = require('option');

function head(list) {
  return option.fromNullable(list[0]).value();
}

module.exports = function({ dataclasses, invariants }) {
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
   * @since 1.0.0
   */
  const _getTypeById = (types, type_id) =>
    option.fromNullable(find(type => type.type_id == type_id, types));

  /**
   * Get a target by its target_id
   * @param  {array} targets   [description]
   * @param  {string} target_id target id name
   * @return {?Target}
   * @since 1.0.0
   */
  const _getTargetById = (targets, target_id) =>
    option.fromNullable(find(target => target.target_id == target_id, targets));

  /**
   * _getOperatorsByIds
   * @param  {Object} columns
   * @param  {string[]} operator_ids
   * @return {Operator[]}
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

  // columns => Promise[columns]
  const initializeColumns = columns => {
    // at first I used lenses, but the code was way harder to read so it's better that way :)

    // wrap operators
    columns.operators = map(dataclasses.Operator, columns.operators);

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
   * Create a new PrediateCore
   * @param       {[type]} data    [description]
   * @param       {[type]} columns [description]
   * @param       {[type]} options [description]
   * @return {Promise[PredicateCoreAPI]}
   */
  function PredicateCore({ data, columns, options } = {}) {
    return initializeColumns(columns || PredicateCore.defaults.columns).then(
      _columns => {
        let _root;
        const _options = merge(PredicateCore.defaults.options, options);

        /**
         * Set PredicateCore data
         * @param {CompoundPredicate} root CompoundPredicate
         * @return {Promise} resolved promise yield nothing, rejected promise yield RootPredicateMustBeACompoundPredicate error
         * @since 1.0.0
         */
        function setData(root) {
          return invariants
            .RootPredicateMustBeACompoundPredicate(root)
            .then(() => {
              _root = root;
            });
        }

        /**
         * Add a ComparisonPredicate or CompoundPredicate
         * @param  {Object} options (http://jsonpatch.com/)
         * @param  {Predicate} options.type what type of Predicate to add
         * @param  {string} options.how should we insert it before, after or instead of? (currently only after is supported)
         * @param  {Object} options.where current element
         * @return {Promise[Predicate]} inserted predicate
         * @since 1.0.0
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
                if (ComparisonPredicate.is(where)) {
                  // first find predicates array that contains the element
                  const path = _find(where);
                  // we are starting from a ComparisonPredicate that always live inside a CompoundPredicate.predicates array
                  const [compoundpredicate, [_, index]] = takeLast(2, path);
                  compoundpredicate.predicates = insert(
                    index + 1,
                    predicate,
                    compoundpredicate.predicates
                  );
                  return predicate;
                }

                if (CompoundPredicate.is(where)) {
                  // we want to add a CompoundPredicate after a compound predicate
                  // so we need to add it as its first .predicates entry
                  where.predicates.unshift(predicate);
                  return predicate;
                }

                return Promise.reject(
                  Error(
                    `Can't add after something else than a CompoundPredicate or a ComparisonPredicate, got: ${JSON.stringify(
                      where
                    )}`
                  )
                );
              })
          );
        }


        /**
         * Change a predicate's target
         * @param {ComparisonPredicate} predicate
         * @param {string} newTarget_id        [description]
         * @return {Promise} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
         */
        function setPredicateTarget_id(predicate, newTarget_id) {
          return Promise.resolve()
            .then(() =>
              invariants.PredicateMustBeAComparisonPredicate(predicate)
            )
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
         * @param {ComparisonPredicate} predicate
         * @param {string} newTarget_id        [description]
         * @return {Promise} yield nothing if everything went right, otherwise yield a reject promise with the PredicateMustBeAComparisonPredicate error
         * @since 1.0.0
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
         * @since 1.0.0
         */
        function _find(element) {
          return _reduce(
            _root,
            (acc, predicate, parents) => {
              return element === predicate ? parents : acc;
            },
            null
          );
        }

        /**
         * Walk through the predicates tree
         * @param       {CompoundPredicate} compoundPredicate starter node
         * @param       {function} f                 accumulation function
         * @param       {T} acc               accumulator
         * @param       {Array}  [parents=[]]      path to the node, array of parents
         * @return      {T} yield the accumulator
         */
        function _reduce(compoundPredicate, f, acc, parents = []) {
          acc = f(acc, compoundPredicate, parents);
          return compoundPredicate.predicates.reduce((_acc, predicate, i) => {
            const _parents = parents.concat([
              compoundPredicate,
              [predicate, i],
            ]);
            return CompoundPredicate.is(predicate)
              ? _reduce(predicate, f, _acc, _parents)
              : f(_acc, predicate, _parents);
          }, acc);
        }

        // get data for initialization
        return (
          (data
            ? Promise.resolve(data)
            : _options.getDefaultData(_columns, _options)
          )
            // setup PredicateCore data
            .then(setData)
            // yield public API
            .then(() => ({
              setData,
              add,
              remove,
              setPredicateTarget_id,
              setPredicateOperator_id,

              /**
               * Get root CompoundPredicate
               * @return {CompoundPredicate}
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
            }))
        );
      }
    );
  }

  PredicateCore.defaults = {
    options: {
      /**
       * When data is not set at construction time PredicateCore default behavior will be to use the first target and its first operator with empty argument
       * @param  {Object} dataclasses every necessary data class
       * @param  {Object} columns every necessary data class
       * @param  {Object} options PredicateCore available options
       * @return {Promise[CompoundPredicate]}  root CompoundPredicate
       * @since 1.0.0
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
       * @param  {Array} predicates
       * @param  {Object} columns specified columns
       * @param  {Object} options PredicateCore available options
       * @return {Promise[CompoundPredicate]} a CompoundPredicate
       * @since 1.0.0
       */
      getDefaultCompoundPredicate(columns, options, predicates) {
        return (!Array.isArray(predicates) || predicates.length === 0
          ? options
              .getDefaultComparisonPredicate(columns, options)
              .then(comparisonPredicate => [comparisonPredicate])
          : Promise.resolve(predicates)
        ).then(predicates => CompoundPredicate(LogicalType.and, predicates));
      },

      /**
       * Default comparison predicate to use
       *
       * This function is called whenever a new ComparisonPredicate is added to the UIPredicate
       * @param  {Object} columns specified columns
       * @param  {Object} options PredicateCore available options
       * @return {Promise[ComparisonPredicate]} a Comparison
       * @since 1.0.0
       */
      getDefaultComparisonPredicate(columns, options) {
        const firstTarget = head(columns.targets);
        return ComparisonPredicate(
          firstTarget,
          head(firstTarget.$type.$operators),
          []
        );
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
    },
  };

  return PredicateCore;
};
