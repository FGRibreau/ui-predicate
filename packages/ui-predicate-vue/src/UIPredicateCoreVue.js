import { PredicateCore } from 'ui-predicate-core';
const { merge } = require('ramda');
import Vue from 'vue';

const defaults = {
  options: {
    /**
     * UIPredicate Vue Adapter own default argument component
     * @param  {Object} columns specified columns
     * @param  {Object} [options=PredicateCore.defaults.options] PredicateCore available options
     * @return {Vue.component}
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
 * @param       {?dataclasses.CompoundPredicate} [data=PredicateCore.defaults.options.getDefaultData]
 * @param       {Object} [columns=PredicateCore.defaults.columns]
 * @param       {Object} [options=PredicateCore.defaults.options]
 * @return {Promise<core.PredicateCoreAPI>}
 * @memberof core
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

module.exports = { UIPredicateCoreVue };
