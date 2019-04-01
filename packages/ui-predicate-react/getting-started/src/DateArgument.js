import React from 'react';

export default function DateArgument({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}
