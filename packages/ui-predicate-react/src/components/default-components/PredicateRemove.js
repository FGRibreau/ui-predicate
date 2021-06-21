import React from 'react';
import PropTypes from 'prop-types';

export default function PredicateRemove({ disabled, onClick }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick}>
      -
    </button>
  );
}

PredicateRemove.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
