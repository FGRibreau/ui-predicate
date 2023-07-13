/* eslint no-unused-vars: "off"*/

/**
 * VueJS adapter for ui-predicate-core
 * @namespace vue
 * @since 1.0.0
 */

import Vue from 'vue';
import assign from 'lodash/assign';
import { PredicateCore, UITypes } from 'ui-predicate-core';
import DEFAULT_COMPONENTS from './default-components';

const defaults = {
  options: {
    /**
     * UIPredicate Vue Adapter own default argument component
     * @param {Object} [columns=PredicateCore.defaults.columns] columns
     * @param {Object} [options=PredicateCore.defaults.options] options
     * @param {Object} [ui=PredicateCore.defaults.ui] ui
     * @return {Vue.component} the default Vue Component to use as argument specifier
     * @see core.defaults.getDefaultArgumentComponent
     * @memberof vue.defaults
     */
    getDefaultArgumentComponent(columns, options, ui) {
      /*
        "ui" arg. results from DEFAULT_COMPONENTS
        and :ui attribute passed to <ui-predicate>
        all merged in UIPredicateCoreVue()
        and passed to PredicateCore
      */
      return ui[UITypes.ARGUMENT_DEFAULT];
    },
  },
};

/**
 * UIPredicateCore adapter for VueJS
 * @param {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData] data
 * @param {Object} [columns=PredicateCore.defaults.columns] columns
 * @param {Object} [ui=PredicateCore.defaults.ui] ui
 * @param {Object} [options=PredicateCore.defaults.options] options
 * @return {Promise<core.PredicateCoreAPI>} resolved promise yield a PredicateCoreAPI
 * @memberof vue
 */
function UIPredicateCoreVue({ data, columns, ui, options } = {}) {
  return PredicateCore({
    data,
    columns,
    ui: assign({}, DEFAULT_COMPONENTS, ui),
    options: assign({}, defaults.options, options),
  });
}

UIPredicateCoreVue.defaults = defaults;

export { UIPredicateCoreVue };
