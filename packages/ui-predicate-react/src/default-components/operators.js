import React from 'react';

export default function Operators({ predicate, onChange }) {
  return (
    <select
      value={predicate.operator.operator_id}
      onChange={ev => onChange(ev.target.value)}
    >
      {predicate.target.$type.$operators.map(operator => (
        <option key={operator.label} value={operator.operator_id}>
          {operator.label}
        </option>
      ))}
    </select>
  );
}
