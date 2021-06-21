import React from 'react';
import PropTypes from 'prop-types';
import { useUIPredicateContext } from '../hooks';
import { UIPredicateComparisonArgument, UIPredicateOptions } from './';

export function UIPredicateComparison({ predicate, columns }) {
  const {
    setPredicateTarget_id,
    setPredicateOperator_id,
    UITypes,
    getUIComponent,
  } = useUIPredicateContext();

  const TargetsComponent = getUIComponent(UITypes.TARGETS);
  const OperatorsComponent = getUIComponent(UITypes.OPERATORS);

  return (
    <div className="ui-predicate__row ui-predicate__row--comparison">
      <div className="ui-predicate__col">
        <TargetsComponent
          columns={columns}
          predicate={predicate}
          onChange={target_id => setPredicateTarget_id(predicate, target_id)}
        />
      </div>
      <div className="ui-predicate__col">
        <OperatorsComponent
          columns={columns}
          predicate={predicate}
          onChange={operator_id =>
            setPredicateOperator_id(predicate, operator_id)
          }
        />
      </div>
      <div className="ui-predicate__col">
        <div className="ui-predicate__arguments">
          <UIPredicateComparisonArgument predicate={predicate} />
        </div>
      </div>
      <div className="ui-predicate__col">
        <UIPredicateOptions predicate={predicate} />
      </div>
    </div>
  );
}

UIPredicateComparison.propTypes = {
  predicate: PropTypes.object,
  columns: PropTypes.object,
};
