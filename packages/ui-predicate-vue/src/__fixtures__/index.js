export default {
  // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
  operators: [
    {
      operator_id: 'is',
      label: 'Is',
    },
    {
      operator_id: 'contains',
      label: 'Contains',
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
      label: 'is between',
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
      label: 'Article title',
      type_id: 'string',
    },
    {
      target_id: 'article.videoCount',
      label: 'Article video count',
      type_id: 'int',
    },
    {
      target_id: 'article.publishingAt',
      label: 'Article publish date',
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
