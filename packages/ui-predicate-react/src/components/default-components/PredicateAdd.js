import React from 'react';
import PropTypes from 'prop-types';

export default function PredicateAdd({ isInAddCompoundMode, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {isInAddCompoundMode ? '…' : '+'}
    </button>
  );
}

PredicateAdd.propTypes = {
  isInAddCompoundMode: PropTypes.bool,
  onClick: PropTypes.func,
};
