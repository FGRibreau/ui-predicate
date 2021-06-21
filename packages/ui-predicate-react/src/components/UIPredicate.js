import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UITypes } from 'ui-predicate-core';
import { InitialisationFailed } from '../errors';
import { UIPredicateContext } from '../contexts/UIPredicateContext';
import { UIPredicateCoreReact } from '../adapters';
import { UIPredicateCompound } from './';
import './UIPredicate.css';

export function UIPredicate({
  data = {},
  columns,
  ui,
  className = '',
  onChange = () => undefined,
}) {
  const [ctrl, setCtrl] = useState(null);
  // even if we don't do anything with it, we need to store the ast
  // to force the component to re-render when it changes
  /* eslint-disable no-unused-vars */
  const [ast, setAST] = useState({});

  useEffect(() => {
    UIPredicateCoreReact({
      data,
      columns,
      ui,
    }).then(setCtrl, err => {
      // wrap ui-predicate-core error in InitialisationFailed error
      return Promise.reject(
        Object.assign(new InitialisationFailed(), { cause: err })
      );
    });
  }, []);

  if (!ctrl) return null;

  return (
    <div className={className}>
      <UIPredicateView
        ctrl={ctrl}
        columns={columns}
        onChange={newAST => {
          setAST(newAST);
          onChange(newAST);
        }}
      />
    </div>
  );
}

UIPredicate.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.object,
  ui: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

function UIPredicateView({ ctrl, columns, onChange }) {
  const [isInAddCompoundMode, setIsInAddCompoundMode] = useState(false);

  useEffect(() => {
    onChange(ctrl.toJSON());
    ctrl.on('changed', () => {
      onChange(ctrl.toJSON());
    });
  }, []);

  useEffect(() => {
    function onAltKey({ newIsInAddCompoundMode }) {
      return function(e) {
        if (e.keyCode === 18) setIsInAddCompoundMode(newIsInAddCompoundMode);
      };
    }
    const onAltPressed = onAltKey({ newIsInAddCompoundMode: true });
    const onAltReleased = onAltKey({ newIsInAddCompoundMode: false });
    window.addEventListener('keyup', onAltReleased);
    window.addEventListener('keydown', onAltPressed);
    return () => {
      window.removeEventListener('keyup', onAltReleased);
      window.removeEventListener('keydown', onAltPressed);
    };
  }, []);

  return (
    <UIPredicateContext.Provider
      value={{
        UITypes,
        isInAddCompoundMode,
        add(predicate) {
          return ctrl.add({
            where: predicate,
            how: 'after',
            type: isInAddCompoundMode
              ? 'CompoundPredicate'
              : 'ComparisonPredicate',
          });
        },
        remove(predicate) {
          return ctrl.remove(predicate);
        },
        setPredicateLogicalType_id(predicate, logicalType_id) {
          return ctrl.setPredicateLogicalType_id(predicate, logicalType_id);
        },
        setPredicateTarget_id(predicate, target_id) {
          return ctrl.setPredicateTarget_id(predicate, target_id);
        },
        setPredicateOperator_id(predicate, operator_id) {
          return ctrl.setPredicateOperator_id(predicate, operator_id);
        },
        getArgumentTypeComponentById(argumentType_id) {
          return ctrl.getArgumentTypeComponentById(argumentType_id);
        },
        setArgumentValue(predicate, value) {
          return ctrl.setArgumentValue(predicate, value);
        },
        getUIComponent(name) {
          return ctrl.getUIComponent(name);
        },
      }}
    >
      <div className="ui-predicate__main">
        {ctrl && (
          <UIPredicateCompound predicate={ctrl.root} columns={columns} />
        )}
      </div>
    </UIPredicateContext.Provider>
  );
}

UIPredicateView.propTypes = {
  ctrl: PropTypes.object,
  columns: PropTypes.object,
  onChange: PropTypes.func,
};
