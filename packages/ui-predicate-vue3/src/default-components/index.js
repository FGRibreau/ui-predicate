import { UITypes } from 'ui-predicate-core';

import Targets from './targets.vue';
import LogicalTypes from './logical-types.vue';
import Operators from './operators.vue';
import PredicateAdd from './predicate-add.vue';
import PredicateRemove from './predicate-remove.vue';
import ArgumentDefault from './argument-default.vue';

export default {
  [UITypes.TARGETS]: Targets,
  [UITypes.LOGICAL_TYPES]: LogicalTypes,
  [UITypes.OPERATORS]: Operators,
  [UITypes.PREDICATE_ADD]: PredicateAdd,
  [UITypes.PREDICATE_REMOVE]: PredicateRemove,
  [UITypes.ARGUMENT_DEFAULT]: ArgumentDefault,
};
