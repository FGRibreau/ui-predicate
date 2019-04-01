import React from 'react';

export default function TextArgument({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={ev => onChange(ev.target.value)}
    />
  );
}
