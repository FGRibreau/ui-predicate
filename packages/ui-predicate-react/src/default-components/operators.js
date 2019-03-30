import React, { Component } from 'react';

class Operators extends Component {
  render() {
    const { predicate } = this.props;
    return (
      <select
        value={predicate.operator.operator_id}
        onChange={ev => this.props.onChange(ev.target.value)}
      >
        {predicate.target.$type.$operators.map(operator => (
          <option key={operator.label} value={operator.operator_id}>
            {operator.label}
          </option>
        ))}
      </select>
    );
  }
}

export default Operators;
