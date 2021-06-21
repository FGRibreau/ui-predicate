/* eslint no-unused-vars: "off"*/

/**
 * ReactJS adapter for ui-predicate-core
 * @namespace React
 * @since 1.0.0
 */

import assign from "lodash/assign";
import { PredicateCore, UITypes } from "ui-predicate-core";
import DEFAULT_COMPONENTS from "../components/default-components";

const defaults = {
  options: {
    /**
     * UIPredicate React Adapter own default argument component
     * @param {Object} [columns=PredicateCore.defaults.columns] columns
     * @param {Object} [options=PredicateCore.defaults.options] options
     * @param {Object} [ui=PredicateCore.defaults.ui] ui
     * @return {React.component} the default React Component to use as argument specifier
     * @see core.defaults.getDefaultArgumentComponent
     * @memberof React.defaults
     */
    getDefaultArgumentComponent(columns, options, ui) {
      /*
        "ui" arg. results from DEFAULT_COMPONENTS
        and :ui attribute passed to <ui-predicate>
        all merged in UIPredicateCoreReact()
        and passed to PredicateCore
      */
      return ui[UITypes.ARGUMENT_DEFAULT];
    }
  }
};

/**
 * UIPredicateCore adapter for ReactJS
 * @param {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData] data
 * @param {Object} [columns=PredicateCore.defaults.columns] columns
 * @param {Object} [ui=PredicateCore.defaults.ui] ui
 * @param {Object} [options=PredicateCore.defaults.options] options
 * @return {Promise<core.PredicateCoreAPI>} resolved promise yield a PredicateCoreAPI
 * @memberof React
 */
function UIPredicateCoreReact({ data, columns, ui, options } = {}) {
  return PredicateCore({
    data,
    columns,
    ui: assign({}, DEFAULT_COMPONENTS, ui),
    options: assign({}, defaults.options, options)
  });
}

UIPredicateCoreReact.defaults = defaults;

export { UIPredicateCoreReact };
