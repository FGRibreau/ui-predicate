import React from 'react';
import PropTypes from 'prop-types';

export default function Operators({ predicate, onChange }) {
  return (
    <select
      className="ui-predicate__operators"
      value={predicate.operator.operator_id}
      onChange={e => onChange(e.target.value)}
    >
      {predicate.target.$type.$operators.map(operator => {
        return (
          <option key={operator.label} value={operator.operator_id}>
            {operator.label}
          </option>
        );
      })}
    </select>
  );
}

Operators.propTypes = {
  predicate: PropTypes.object,
  columns: PropTypes.object,
  onChange: PropTypes.func,
};
