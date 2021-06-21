import React from 'react';
import PropTypes from 'prop-types';
import { useUIPredicateContext } from '../hooks';
import { UIPredicateOptions, UIPredicateComparison } from './';

export function UIPredicateCompound({ predicate, columns }) {
  const {
    setPredicateLogicalType_id,
    UITypes,
    getUIComponent,
  } = useUIPredicateContext();

  const LogicalTypesComponent = getUIComponent(UITypes.LOGICAL_TYPES);
  return (
    <div className="ui-predicate__row--compound">
      <div className="ui-predicate__row">
        <div className="ui-predicate__col">
          {predicate.logic && (
            <LogicalTypesComponent
              predicate={predicate}
              columns={columns}
              onChange={logicalType_id => {
                setPredicateLogicalType_id(predicate, logicalType_id);
              }}
            />
          )}
        </div>
        <div className="ui-predicate__col">
          <UIPredicateOptions predicate={predicate} />
        </div>
      </div>
      {predicate.predicates.map((childPredicate, index) => {
        const ChildPredicateComponent = (() => {
          if (childPredicate.$_type === 'CompoundPredicate')
            return UIPredicateCompound;

          if (childPredicate.$_type === 'ComparisonPredicate')
            return UIPredicateComparison;

          return undefined;
        })();
        if (!ChildPredicateComponent) return null;

        return (
          <ChildPredicateComponent
            key={index}
            predicate={childPredicate}
            columns={columns}
          />
        );
      })}
    </div>
  );
}

UIPredicateCompound.propTypes = {
  predicate: PropTypes.object,
  columns: PropTypes.object,
};
