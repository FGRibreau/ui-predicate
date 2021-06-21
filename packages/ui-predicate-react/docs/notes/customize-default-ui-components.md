## Core ui-predicate component override

If you need to override defaults ui-predicate UI components to match your needs, use the `ui` prop.

```javascript
import { UITypes } from "ui-predicate-core";
const MyCustomComponent = {
  /* VueJS Component Definition */
};

const UI_OVERRIDES = {
  [UITypes.TARGETS]: MyCustomComponent,
  [UITypes.LOGICAL_TYPES]: MyCustomComponent,
  [UITypes.OPERATORS]: MyCustomComponent,
  [UITypes.PREDICATE_ADD]: MyCustomComponent,
  [UITypes.PREDICATE_REMOVE]: MyCustomComponent,
  // If UIPredicate can't find a component related to your argumentType_id
  // This component will be used as a fallback.
  // By default it just an <input type="text">
  [UITypes.ARGUMENT_DEFAULT]: MyCustomComponent
};
```
