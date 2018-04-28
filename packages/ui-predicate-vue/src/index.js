const UIPredicateOptions = require('../src/components/ui-predicate-options');
const UIPredicateComparison = require('../src/components/ui-predicate-comparison');
const UIPredicateCompound = require('../src/components/ui-predicate-compound');
const UIPredicate = require('../src/components/ui-predicate');

const components = [
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateCompound,
  UIPredicate,
];

// f(Vue, opts = {}) used by Vue.use()
const install = function(Vue) {
  components.forEach(component => Vue.component(component.name, component));
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

module.exports = {
  version: require('../package.json').version,
  install,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateCompound,
  UIPredicate,
};

module.exports.default = module.exports;
