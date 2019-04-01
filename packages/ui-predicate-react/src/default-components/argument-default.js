import React from 'react';

export default function ArgumentDefault({ value, onChange }) {
  return <input value={value} onChange={ev => onChange(ev.target.value)} />;
}
