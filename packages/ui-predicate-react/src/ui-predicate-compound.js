import React, { Component } from 'react';
import { UITypes } from 'ui-predicate-core';
import UIPredicateComparison from './ui-predicate-comparison';
import UIPredicateOptions from './ui-predicate-options';

class UIPredicateCompound extends Component {
  constructor(props) {
    super(props);
    this.changeLogic = this.changeLogic.bind(this);
    this.renderPredicates = this.renderPredicates.bind(this);
  }

  changeLogic(logicalType_id) {
    this.props.setPredicateLogicalType_id(this.props.predicate, logicalType_id);
  }

  renderPredicates(predicates, columns) {
    return predicates.map((model, index) => {
      if (model.$_type === 'CompoundPredicate') {
        return (
          <UIPredicateCompound
            {...this.props}
            key={index}
            predicate={model}
            columns={columns}
          />
        );
      }
      if (model.$_type === 'ComparisonPredicate') {
        return (
          <UIPredicateComparison
            {...this.props}
            key={index}
            predicate={model}
            columns={columns}
          />
        );
      }
      return null;
    });
  }
  render() {
    const { predicate, columns, getUIComponent } = this.props;
    const LogicalTypesComponent = getUIComponent(UITypes.LOGICAL_TYPES);

    return (
      <div className="ui-predicate__row--compound">
        <div className="ui-predicate__row">
          <div className="ui-predicate__col">
            {Boolean(predicate.logic) && (
              <LogicalTypesComponent
                {...this.props}
                className="ui-predicate__logic"
                predicate={predicate}
                columns={columns}
                onChange={value => this.changeLogic(value)}
              />
            )}
          </div>
          <div className="ui-predicate__col">
            <UIPredicateOptions {...this.props} predicate={predicate} />
          </div>
        </div>
        {this.renderPredicates(predicate.predicates, columns)}
      </div>
    );
  }
}

export default UIPredicateCompound;
