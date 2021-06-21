const errors = require("./errors");
const {
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateComparisonArgument,
  UIPredicateCompound,
  UIPredicate
} = require("./components");

/* istanbul ignore if */
if (typeof window !== "undefined")
  window.UIPredicate = UIPredicate;

module.exports = {
  version: require("../package.json").version,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateComparisonArgument,
  UIPredicateCompound,
  UIPredicate,
  errors
};

module.exports.default = module.exports;
