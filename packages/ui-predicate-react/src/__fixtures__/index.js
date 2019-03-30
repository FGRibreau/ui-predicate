import React from 'react';

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
      component: getReactHTML5Element('date'),
    },
    {
      argumentType_id: 'colorpicker',
      component: getReactHTML5Element('color'),
    },
    {
      argumentType_id: 'daterangepicker',
      component: function DateRangePicker(props) {
        const methods = {
          _fromValue(value) {
            const [start, end] = Array.isArray(value) ? value : [];
            this.start = start || '';
            this.end = end || '';
            return this._toValue();
          },
          _toValue() {
            return [this.start, this.end];
          },
          _updated() {
            props.onChange(this._toValue());
          },
          _onStartChange({ target: { value: newValue } }) {
            this.start = newValue;
            this._updated();
          },
          _onEndChange({ target: { value: newValue } }) {
            this.end = newValue;
            this._updated();
          },
        };
        methods._onStartChange = methods._onStartChange.bind(methods);
        methods._onEndChange = methods._onEndChange.bind(methods);
        methods._fromValue = methods._fromValue.bind(methods);
        methods._toValue = methods._toValue.bind(methods);
        methods._fromValue(props.value || '');
        return (
          <div style={{ display: 'flex', width: '260px' }}>
            <input
              type="date"
              onChange={ev => methods._onStartChange(ev)}
              value={methods.start}
            />
            <span>and</span>
            <input
              type="date"
              onChange={ev => methods._onEndChange(ev)}
              value={methods.end}
            />
          </div>
        );
      },
    },
    {
      argumentType_id: 'smallString',
      component: getReactHTML5Element('text'),
    },
    {
      argumentType_id: 'number',
      component: getReactHTML5Element('number'),
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

function getReactHTML5Element(inputType) {
  const AttributeElement = function(props) {
    React.Component.call(this, props);
    const { value } = props;
    this.state = {
      value: value || '',
    };
    this.handleChange = this.handleChange.bind(this);
  };
  AttributeElement.prototype = Object.create(React.Component.prototype);
  AttributeElement.prototype.render = function() {
    const { value } = this.state;
    return (
      <div>
        <input
          type={inputType}
          onChange={ev => this.handleChange(ev)}
          value={value}
        />
      </div>
    );
  };
  AttributeElement.prototype.handleChange = function({ target: { value } }) {
    this.setState({
      value,
    });
    const { onChange } = this.props;
    onChange(value);
  };
  return AttributeElement;
}

export default {
  DATASETS,
  DEFAULT_CONFIG,
};
