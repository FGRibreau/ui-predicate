// const PredicateCore = require('ui-predicate-core');
const { PredicateCore } = require('..');

PredicateCore({
  // data:{},
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
  },
}).then(core => {
  window.core = core;
  console.log('🎉 You can play with `core` global variable');
  console.log(core);
});
