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
    const RemoveComponent = getUIComponent(UITypes.PREDICATE_REMOVE);
    const AddComponent = getUIComponent(UITypes.PREDICATE_ADD);

    return (
      <div className="ui-predicate__options">
        <div className="ui-predicate__option">
          <RemoveComponent
            {...this.props}
            onClick={() => remove(predicate)}
            predicate={predicate}
            disabled={predicate.$canBeRemoved === false}
          />
        </div>
        <div className="ui-predicate__option">
          <AddComponent
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
