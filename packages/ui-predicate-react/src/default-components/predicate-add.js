import React, { Component } from 'react';

class PredicateAdd extends Component {
  render() {
    const { isInAddCompoundMode, onClick } = this.props;
    return (
      <button onClick={onClick} type="button">
        {isInAddCompoundMode ? '…' : '+'}
      </button>
    );
  }
}

export default PredicateAdd;
