/* eslint no-unused-vars: "off"*/

/**
 * VueJS adapter for ui-predicate-core
 * @namespace vue
 * @since 1.0.0
 */

import { PredicateCore } from 'ui-predicate-core';
const merge = require('lodash/merge');
import Vue from 'vue';

const defaults = {
  options: {
    /**
     * UIPredicate Vue Adapter own default argument component
     * @param  {Object} columns specified columns
     * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
     * @return {Vue.component} the default Vue Component to use as argument specifier
     * @see core.defaults.getDefaultArgumentComponent
     * @memberof vue.defaults
     */
    getDefaultArgumentComponent(columns, options) {
      return Vue.component('default-argument-component', {
        methods: {
          _onChange({ target: { value: newValue } }) {
            this.$emit('change', newValue);
          },
        },
        props: {
          value: {
            type: null,
            required: true,
          },
        },
        template:
          '<div><input type="text" @change="_onChange" :value="value"></div>',
      });
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
function UIPredicateCoreVue({ data, columns, options } = {}) {
  const _options = merge(defaults.options, options);

  return PredicateCore({
    data,
    columns,
    options: _options,
  });
}

UIPredicateCoreVue.defaults = defaults;

export { UIPredicateCoreVue };
