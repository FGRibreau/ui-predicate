import errors from './errors';
import UIPredicateOptions from './ui-predicate-options.vue';
import UIPredicateComparison from './ui-predicate-comparison.vue';
import UIPredicateComparisonArgument from './ui-predicate-comparison-argument';
import UIPredicateCompound from './ui-predicate-compound.vue';
import UIPredicate from './ui-predicate.vue';
import { version } from './../package.json';

// // not single-source-of-truth, but need it for static refs
export const components = {
  // https://w3c.github.io/webcomponents/spec/custom/#concepts
  // The custom element type identifies a custom element interface and is a sequence of characters that must match the NCName production,
  // must contain a U+002D HYPHEN-MINUS character, and must not contain any uppercase ASCII letters.
  'ui-predicate-options': UIPredicateOptions,
  'ui-predicate-comparison': UIPredicateComparison,
  'ui-predicate-comparison-argument': UIPredicateComparisonArgument,
  'ui-predicate-compound': UIPredicateCompound,
  'ui-predicate': UIPredicate,
};

// f(Vue, opts = {}) used by Vue.use()
const install = function(Vue) {
  Object.keys(components).forEach(name => {
    Vue.component(name, components[name].default || components[name]);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  window.UIPredicate = UIPredicate;
}

export default {
  version,
  install,
  components,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateComparisonArgument,
  UIPredicateCompound,
  UIPredicate,
  errors,
};
