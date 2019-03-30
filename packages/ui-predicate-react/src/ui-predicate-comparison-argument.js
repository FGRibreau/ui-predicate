import React, { Component } from 'react';

class UIPredicateComparisonArgument extends Component {
  render() {
    const {
      getArgumentTypeComponentById,
      setArgumentValue,
      predicate,
    } = this.props;
    const ArgumentComponent = getArgumentTypeComponentById(
      predicate.operator.argumentType_id
    );

    return (
      <ArgumentComponent
        {...this.props}
        value={predicate.argument}
        predicate={predicate}
        onChange={value => setArgumentValue(predicate, value)}
      />
    );
  }
}

export default UIPredicateComparisonArgument;
