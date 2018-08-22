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
     * @return {Vue.component} the default Vue Component to use as argument specifier
     * @see core.defaults.getDefaultArgumentComponent
     * @memberof vue.defaults
     */
    getDefaultArgumentComponent() {
      return DEFAULT_COMPONENTS[UITypes.ARGUMENT_DEFAULT];
    },
  },
};

/**
 * UIPredicateCore adapter for VueJS
 * @param       {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData] data
 * @param       {Object} [columns=PredicateCore.defaults.columns] columns
 * @param       {Object} [options=PredicateCore.defaults.options] options
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
