import React from 'react';

export default function LogicalTypes({ predicate, columns, onChange }) {
  return (
    <select
      value={predicate.logic.logicalType_id}
      onChange={ev => onChange(ev.target.value)}
    >
      {columns.logicalTypes.map(logicalType => (
        <option key={logicalType.label} value={logicalType.logicalType_id}>
          {logicalType.label}
        </option>
      ))}
    </select>
  );
}
