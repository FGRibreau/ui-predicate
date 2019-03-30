import React, { Component } from 'react';

class LogicalTypes extends Component {
  render() {
    const { predicate, columns } = this.props;
    return (
      <select
        value={predicate.logic.logicalType_id}
        onChange={ev => this.props.onChange(ev.target.value)}
      >
        {columns.logicalTypes.map(logicalType => (
          <option key={logicalType.label} value={logicalType.logicalType_id}>
            {logicalType.label}
          </option>
        ))}
      </select>
    );
  }
}

export default LogicalTypes;
