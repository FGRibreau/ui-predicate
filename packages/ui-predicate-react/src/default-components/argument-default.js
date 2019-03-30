import React, { Component } from 'react';

class ArgumentDefault extends Component {
  render() {
    const { value } = this.props;
    return (
      <input
        value={value}
        onChange={ev => this.props.onChange(ev.target.value)}
      />
    );
  }
}

export default ArgumentDefault;
