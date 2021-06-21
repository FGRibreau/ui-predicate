import React from 'react';
import PropTypes from 'prop-types';

export default function Target({ columns, predicate, onChange }) {
  return (
    <select
      className="ui-predicate__targets"
      value={predicate.target.target_id}
      onChange={e => onChange(e.target.value)}
    >
      {columns.targets.map(target => {
        return (
          <option key={target.label} value={target.target_id}>
            {target.label}
          </option>
        );
      })}
    </select>
  );
}

Target.propTypes = {
  columns: PropTypes.object,
  predicate: PropTypes.object,
  onChange: PropTypes.func,
};
