const UIPredicateOptions = require('../src/UIPredicateOptions.vue');
const UIPredicateComparison = require('../src/UIPredicateComparison.vue');
const UIPredicateCompound = require('../src/UIPredicateCompound.vue');
const UIPredicate = require('../src/UIPredicate.vue');

// not single-source-of-truth, but need it for static refs
const components = {
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateCompound,
  UIPredicate,
};

// f(Vue, opts = {}) used by Vue.use()
const install = function(Vue) {
  Object.keys(components).forEach(name =>
    Vue.component(name, components[name].default)
  );
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) install(window.Vue);

module.exports = {
  version: require('../package.json').version,
  install,
  components,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateCompound,
  UIPredicate,
};

module.exports.default = module.exports;
