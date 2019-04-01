import React from 'react';

export default function Targets({ predicate, columns, onChange }) {
  return (
    <select
      value={predicate.target.target_id}
      onChange={ev => onChange(ev.target.value)}
    >
      {columns.targets.map(target => (
        <option key={target.label} value={target.target_id}>
          {target.label}
        </option>
      ))}
    </select>
  );
}
