import errors from './errors';
import UIPredicateOptions from './ui-predicate-options';
import UIPredicateComparison from './ui-predicate-comparison';
import UIPredicateComparisonArgument from './ui-predicate-comparison-argument';
import UIPredicateCompound from './ui-predicate-compound';
import { default as _UIPredicate } from './ui-predicate';

export const UIPredicate = _UIPredicate; // Needed for storybook somehow

export default {
  version: require('../package.json').version,
  UIPredicateOptions,
  UIPredicateComparison,
  UIPredicateComparisonArgument,
  UIPredicateCompound,
  UIPredicate,
  errors,
};
