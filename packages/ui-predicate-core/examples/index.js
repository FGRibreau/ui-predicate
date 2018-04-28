// const PredicateCore = require('ui-predicate-core');
const PredicateCore = require('..');

PredicateCore({
  // data:{},
  // columns:{},
  options: {
    // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
    operators: [
      {
        operator_id: 'is',
        label: 'Est',
        ploplop: [1, 2, 3],
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
        target_id: 'article.videoCount',
        label: 'Nombre de vidéos',
        type_id: 'int',
      },
      {
        target_id: 'article.publishingAt',
        label: 'Date publication',
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
  console.log('🎉 You can play with `core` global variable');
});
