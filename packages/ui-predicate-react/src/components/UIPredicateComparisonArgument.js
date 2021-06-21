import React from 'react';
import PropTypes from 'prop-types';
import { useUIPredicateContext } from '../hooks';

export function UIPredicateComparisonArgument({ predicate }) {
  const {
    getArgumentTypeComponentById,
    setArgumentValue,
  } = useUIPredicateContext();
  return React.createElement(
    getArgumentTypeComponentById(predicate.operator.argumentType_id),
    {
      predicate,
      value: predicate.argument,
      onChange(value) {
        setArgumentValue(predicate, value);
      },
    }
  );
}

UIPredicateComparisonArgument.propTypes = {
  predicate: PropTypes.object,
};
