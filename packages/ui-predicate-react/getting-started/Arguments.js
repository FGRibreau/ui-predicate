import React from 'react';
import PropTypes from 'prop-types';

export function Input({ type, value, onChange }) {
  return (
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
    />
  );
}

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export function ColorArgument(props) {
  return <Input type="color" {...props} />;
}

export function DateArgument(props) {
  return <Input type="date" {...props} />;
}

export function TextArgument(props) {
  return <Input type="text" {...props} />;
}
