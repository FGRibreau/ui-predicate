const errors = require('./errors');
const UIPredicateOptions = require('./ui-predicate-options.vue');
const UIPredicateComparison = require('./ui-predicate-comparison.vue');
const UIPredicateComparisonArgument = require('./ui-predicate-comparison-argument');
const UIPredicateCompound = require('./ui-predicate-compound.vue');
const UIPredicate = require('./ui-predicate.vue');

// not single-source-of-truth, but need it for static refs
const components = {
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
    // console.log('Installing %s', name, components[name]);
    Vue.component(name, components[name].default || components[name]);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  window.UIPredicate = UIPredicate;
}

module.exports = {
  version: require('../package.json').version,
  install,
  components,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateComparisonArgument,
  UIPredicateCompound,
  UIPredicate,
  errors,
};

module.exports.default = module.exports;
