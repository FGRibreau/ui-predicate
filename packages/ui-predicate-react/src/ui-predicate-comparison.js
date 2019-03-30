import React, { Component } from 'react';
import { UITypes } from 'ui-predicate-core';
import UIPredicateComparisonArgument from './ui-predicate-comparison-argument';
import UIPredicateOptions from './ui-predicate-options';

class UIPredicateComparison extends Component {
  constructor(props) {
    super(props);
    this.changeTarget = this.changeTarget.bind(this);
    this.changeOperator = this.changeOperator.bind(this);
  }

  changeTarget(target_id) {
    const { predicate } = this.props;
    this.props.setPredicateTarget_id(predicate, target_id);
  }

  changeOperator(operator_id) {
    const { predicate } = this.props;
    this.props.setPredicateOperator_id(predicate, operator_id);
  }

  render() {
    const { predicate, columns, getUIComponent } = this.props;

    const TargetsComponent = getUIComponent(UITypes.TARGETS);
    const OperatorsComponent = getUIComponent(UITypes.OPERATORS);

    return (
      <div className="ui-predicate__row ui-predicate__row--comparison">
        <div className="ui-predicate__col">
          <TargetsComponent
            {...this.props}
            className="ui-predicate__targets"
            columns={columns}
            predicate={predicate}
            onChange={target_id => this.changeTarget(target_id)}
          />
        </div>
        <div className="ui-predicate__col">
          <OperatorsComponent
            {...this.props}
            className="ui-predicate__operators"
            columns={columns}
            predicate={predicate}
            onChange={operator_id => this.changeOperator(operator_id)}
          />
        </div>
        <div className="ui-predicate__col">
          <UIPredicateComparisonArgument
            {...this.props}
            className="ui-predicate__arguments"
            predicate={predicate}
          />
        </div>
        <div className="ui-predicate__col">
          <UIPredicateOptions {...this.props} predicate={predicate} />
        </div>
      </div>
    );
  }
}

export default UIPredicateComparison;
