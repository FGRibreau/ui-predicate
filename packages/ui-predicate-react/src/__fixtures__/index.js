import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Input({ type, value, onChange }) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

const ColorArgument = props => <Input type="color" {...props} />;
const DateArgument = props => <Input type="date" {...props} />;
const TextArgument = props => <Input type="text" {...props} />;
const NumberArgument = props => <Input type="number" {...props} />;

function fromValue(value) {
  const [start, end] = Array.isArray(value) ? value : [];
  return {
    start,
    end,
  };
}

function DateRangePickerArgument({ value, onChange }) {
  const [range, setRange] = useState(fromValue(value));

  function updateRange(newPartialState) {
    const newState = {
      ...range,
      ...newPartialState,
    };
    setRange(newState);
    onChange([newState.start, newState.end]);
  }

  return (
    <div style={{ display: 'flex', width: 300 }}>
      <input
        type="date"
        value={range.start}
        onChange={e =>
          updateRange({
            start: e.target.value,
          })
        }
      />
      <span>and</span>
      <input
        type="date"
        value={range.end}
        onChange={e =>
          updateRange({
            end: e.target.value,
          })
        }
      />
    </div>
  );
}

DateRangePickerArgument.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func,
};

export const DEFAULT_CONFIG = {
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
    {
      operator_id: 'isBrighterThan',
      label: 'is brighter than',
      argumentType_id: 'colorpicker',
    },
    {
      operator_id: 'isDarkerThan',
      label: 'is darker than',
      argumentType_id: 'colorpicker',
    },
    {
      operator_id: 'is_color',
      label: 'is',
      argumentType_id: 'colorpicker',
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
      operator_ids: ['is_date', 'isBetween_date'],
    },
    {
      type_id: 'color',
      operator_ids: ['isBrighterThan', 'isDarkerThan', 'is_color'],
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
    {
      target_id: 'article.color',
      label: 'Article main color',
      type_id: 'color',
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
      component: DateArgument,
    },
    {
      argumentType_id: 'colorpicker',
      component: ColorArgument,
    },
    {
      argumentType_id: 'daterangepicker',
      component: DateRangePickerArgument,
    },
    {
      argumentType_id: 'smallString',
      component: TextArgument,
    },
    {
      argumentType_id: 'number',
      component: NumberArgument,
    },
  ],
};

export const DATASETS = {
  simple: {
    logicalType_id: 'all',
    predicates: [
      {
        target_id: 'article.videoCount',
        operator_id: 'isHigherThan',
        argument: 10,
      },
    ],
  },
  advanced: {
    logicalType_id: 'all',
    predicates: [
      {
        target_id: 'article.title',
        operator_id: 'contains',
        argument: 'paradise',
      },
      {
        target_id: 'article.videoCount',
        operator_id: 'isHigherThan',
        argument: 2,
      },
      {
        logicalType_id: 'none',
        predicates: [
          {
            target_id: 'article.publishingAt',
            operator_id: 'isBetween_date',
            argument: ['2017-10-05', '2018-10-05'],
          },
          {
            target_id: 'article.publishingAt',
            operator_id: 'isBetween_date',
            argument: ['2010-10-05', '2011-10-05'],
          },
          {
            target_id: 'article.color',
            operator_id: 'is_color',
            argument: '#e20400',
          },
          {
            target_id: 'article.color',
            operator_id: 'isDarkerThan',
            argument: '#783d3e',
          },
        ],
      },
    ],
  },
};
