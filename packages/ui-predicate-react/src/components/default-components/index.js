import { UITypes } from "ui-predicate-core";

import Targets from "./Targets";
import LogicalTypes from "./LogicalTypes";
import Operators from "./Operators";
import PredicateAdd from "./PredicateAdd";
import PredicateRemove from "./PredicateRemove";
import ArgumentDefault from "./ArgumentDefault";

export default {
  [UITypes.TARGETS]: Targets,
  [UITypes.LOGICAL_TYPES]: LogicalTypes,
  [UITypes.OPERATORS]: Operators,
  [UITypes.PREDICATE_ADD]: PredicateAdd,
  [UITypes.PREDICATE_REMOVE]: PredicateRemove,
  [UITypes.ARGUMENT_DEFAULT]: ArgumentDefault,
};
