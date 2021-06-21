import React from 'react';
import PropTypes from 'prop-types';
import { useUIPredicateContext } from '../hooks';

export function UIPredicateOptions({ predicate }) {
  const {
    add,
    remove,
    isInAddCompoundMode,
    UITypes,
    getUIComponent,
  } = useUIPredicateContext();

  const AddComponent = getUIComponent(UITypes.PREDICATE_ADD);
  const RemoveComponent = getUIComponent(UITypes.PREDICATE_REMOVE);

  return (
    <div className="ui-predicate__options">
      <div className="ui-predicate__option">
        <RemoveComponent
          onClick={() => remove(predicate)}
          predicate={predicate}
          isInAddCompoundMode={isInAddCompoundMode}
          disabled={!predicate.$canBeRemoved}
        />
      </div>
      <div className="ui-predicate__option">
        <AddComponent
          predicate={predicate}
          isInAddCompoundMode={isInAddCompoundMode}
          onClick={() => add(predicate)}
        />
      </div>
    </div>
  );
}

UIPredicateOptions.propTypes = {
  predicate: PropTypes.object,
};
