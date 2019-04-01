import React from 'react';

export default function PredicateAdd({ isInAddCompoundMode, onClick }) {
  return (
    <button onClick={onClick} type="button">
      {isInAddCompoundMode ? '…' : '+'}
    </button>
  );
}
