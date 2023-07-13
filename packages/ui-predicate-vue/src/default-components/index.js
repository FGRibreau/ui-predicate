import { UITypes } from 'ui-predicate-core';

import Targets from './targets';
import LogicalTypes from './logical-types';
import Operators from './operators';
import PredicateAdd from './predicate-add';
import PredicateRemove from './predicate-remove';
import ArgumentDefault from './argument-default';

export default {
  [UITypes.TARGETS]: Targets,
  [UITypes.LOGICAL_TYPES]: LogicalTypes,
  [UITypes.OPERATORS]: Operators,
  [UITypes.PREDICATE_ADD]: PredicateAdd,
  [UITypes.PREDICATE_REMOVE]: PredicateRemove,
  [UITypes.ARGUMENT_DEFAULT]: ArgumentDefault,
};
