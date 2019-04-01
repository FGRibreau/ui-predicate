import React, { Component } from 'react';
import { UITypes } from 'ui-predicate-core';

class UIPredicateOptions extends Component {
  render() {
    const {
      predicate,
      remove,
      add,
      getUIComponent,
      getAddCompoundMode,
    } = this.props;
    const RemovePredicateComponent = getUIComponent(UITypes.PREDICATE_REMOVE);
    const AddPredicateComponent = getUIComponent(UITypes.PREDICATE_ADD);

    return (
      <div className="ui-predicate__options">
        <div className="ui-predicate__option">
          <RemovePredicateComponent
            {...this.props}
            onClick={() => remove(predicate)}
            predicate={predicate}
            disabled={predicate.$canBeRemoved === false}
          />
        </div>
        <div className="ui-predicate__option">
          <AddPredicateComponent
            {...this.props}
            onClick={() => add(predicate)}
            predicate={predicate}
            isInAddCompoundMode={getAddCompoundMode()}
          />
        </div>
      </div>
    );
  }
}

export default UIPredicateOptions;
