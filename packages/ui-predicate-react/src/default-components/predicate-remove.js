import React, { Component } from 'react';

class PredicateRemove extends Component {
  render() {
    const { disabled, onClick } = this.props;
    return (
      <button type="button" onClick={onClick} disabled={disabled}>
        -
      </button>
    );
  }
}

export default PredicateRemove;
