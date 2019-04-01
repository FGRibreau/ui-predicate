/* eslint no-unused-vars: "off"*/

/**
 * React adapter for ui-predicate-core
 * @namespace react
 * @since 0.2.0
 */

import React from 'react';
import { PredicateCore, UITypes } from 'ui-predicate-core';
import assign from 'lodash/assign';
import DEFAULT_COMPONENTS from './default-components';

const defaults = {
  options: {
    /**
     * UIPredicate React Adapter own default argument component
     * @param {Object} [columns=PredicateCore.defaults.columns] columns
     * @param {Object} [options=PredicateCore.defaults.options] options
     * @param {Object} [ui=PredicateCore.defaults.ui] ui
     * @return {(React.Component|React.PureComponent|React.FunctionComponent)} the default React Component to use as argument specifier
     * @see core.defaults.getDefaultArgumentComponent
     * @memberof react.defaults
     */
    getDefaultArgumentComponent(columns, options, ui) {
      /*
        "ui" arg. results from DEFAULT_COMPONENTS
        and :ui attribute passed to <UIPredicate>
        all merged in UIPredicateCoreReact()
        and passed to PredicateCore
      */
      return ui[UITypes.ARGUMENT_DEFAULT];
    },
  },
};

/**
 * UIPredicateCore adapter for React
 * @param {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData] data
 * @param {Object} [columns=PredicateCore.defaults.columns] columns
 * @param {Object} [ui=PredicateCore.defaults.ui] ui
 * @param {Object} [options=PredicateCore.defaults.options] options
 * @return {Promise<core.PredicateCoreAPI>} resolved promise yield a PredicateCoreAPI
 * @memberof react
 */
function UIPredicateCoreReact({ data, columns, ui, options } = {}) {
  return PredicateCore({
    data,
    columns,
    ui: assign({}, DEFAULT_COMPONENTS, ui),
    options: assign({}, defaults.options, options),
  });
}

UIPredicateCoreReact.defaults = defaults;

export default UIPredicateCoreReact;
