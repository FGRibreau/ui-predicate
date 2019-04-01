import React, { Component } from 'react';

import { UIPredicate } from 'ui-predicate-react';
import ColorArgument from './ColorArgument';
import TextArgument from './TextArgument';
import DateArgument from './DateArgument';

const predicate = {
  logicalType_id: 'all',
  predicates: [
    {
      target_id: 'article.videoCount',
      operator_id: 'isEqualTo',
      argument: 42,
    },
  ],
};
const columns = {
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
      operator_ids: ['is_date'],
    },
    {
      type_id: 'color',
      operator_ids: ['isBrighterThan', 'isDarkerThan', 'is_color'],
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
      argumentType_id: 'smallString',
      component: TextArgument,
    },
    {
      argumentType_id: 'number',
      component: TextArgument,
    },
  ],
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ast: {} };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(diff) {
    this.setState({
      ast: diff,
    });
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <UIPredicate
            predicate={predicate}
            columns={columns}
            onChange={this.handleChange}
            onInitialized={ctrl => this.handleChange(ctrl.toJSON())}
          />
        </div>

        <div className="column">
          <article className="message is-info">
            <div className="message-header">
              <p>Tips</p>
            </div>
            <div className="message-body">
              Tips: Use <code>alt + click</code> to create a sub-group.
            </div>
          </article>

          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Output</p>
            </header>
            <div className="card-content">
              <pre>{JSON.stringify(this.state.ast, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
