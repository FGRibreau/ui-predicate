import React from 'react';

export default function PredicateRemove({ disabled, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      -
    </button>
  );
}
