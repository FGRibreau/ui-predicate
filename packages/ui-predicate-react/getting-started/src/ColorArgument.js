import React from 'react';

export default function ColorArgument({ value, onChange }) {
  return (
    <input
      type="color"
      value={value}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}
