import React, { Component } from 'react';

class Targets extends Component {
  render() {
    const { predicate, columns } = this.props;
    return (
      <select
        value={predicate.target.target_id}
        onChange={ev => this.props.onChange(ev.target.value)}
      >
        {columns.targets.map(target => (
          <option key={target.label} value={target.target_id}>
            {target.label}
          </option>
        ))}
      </select>
    );
  }
}

export default Targets;
