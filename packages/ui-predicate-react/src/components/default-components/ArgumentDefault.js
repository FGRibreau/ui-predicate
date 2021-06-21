import React from 'react';
import PropTypes from 'prop-types';

export default function ArgumentDefault({ value, onChange }) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  );
}

ArgumentDefault.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};
