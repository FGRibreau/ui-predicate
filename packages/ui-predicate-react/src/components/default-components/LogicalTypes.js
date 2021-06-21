import React from 'react';
import PropTypes from 'prop-types';

export default function LogicalTypes({ predicate, columns, onChange }) {
  return (
    <select
      className="ui-predicate__logic"
      value={predicate.logic.logicalType_id}
      onChange={e => onChange(e.target.value)}
    >
      {columns.logicalTypes.map(logicalType => {
        return (
          <option key={logicalType.label} value={logicalType.logicalType_id}>
            {logicalType.label}
          </option>
        );
      })}
    </select>
  );
}

LogicalTypes.propTypes = {
  predicate: PropTypes.object,
  columns: PropTypes.object,
  onChange: PropTypes.func,
};
