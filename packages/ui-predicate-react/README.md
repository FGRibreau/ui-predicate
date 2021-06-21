<center>
<h2 align="center">ReactJS ui-predicate component</h2>
<p align="center">
<a href="https://www.npmjs.com/package/ui-predicate-react"><img src="https://img.shields.io/npm/v/ui-predicate-react.svg" /></a> <a href="https://www.jsdelivr.com/package/npm/ui-predicate-react"><img src="https://data.jsdelivr.com/v1/package/npm/ui-predicate-react/badge" /></a><br/>
</p>
</center>

<!--
(todo - insert logo)
(todo - insert screenshot)
-->

## Introduction

ui-predicate-react is a rules editor, predicates component, for React JS. It aims to provide a clean, semantic and reusable component that make building your filtering or rules user interface a breeze.

## Documentation

Checkout the [getting-started](https://ui-predicate.fgribreau.com/ui-predicate-react/latest#/getting-started), [storybook](https://ui-predicate.fgribreau.com/ui-predicate-react/latest#/examples) or the [API documentation](https://ui-predicate.fgribreau.com/ui-predicate-react/latest).

## One minute Quick-start

[Read the code](./getting-started) or [try it online](https://ui-predicate.fgribreau.com/ui-predicate-react/latest#/getting-started).

## Installation

```bash
# npm
npm install ui-predicate-react -S
```

```bash
# yarn
yarn add ui-predicate-react
```

# Setup

```js
import { UIPredicate } from "ui-predicate-react";

const schema = {
  predicate: {
    logicalType_id: "all",
    predicates: [
      {
        target_id: "article.title",
        operator_id: "is",
        argument: "42",
      },
    ],
  },
  columns: {
    targets: [
      {
        target_id: "article.title",
        label: "Article title",
        type_id: "string",
      },
    ],
    operators: [
      {
        operator_id: "is",
        label: "is",
        argumentType_id: "smallString",
      },
    ],
    types: [
      {
        type_id: "string",
        operator_ids: ["is"],
      },
    ],
    logicalTypes: [
      {
        logicalType_id: "all",
        label: "All",
      },
    ],
    argumentTypes: [
      {
        argumentType_id: "smallString",
        component: function TextArgument({ value, onChange }) {
          return (
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          );
        },
      },
    ],
  },
};

export default function App() {
  const [ast, setAST] = useState({});
  const { predicate, columns } = schema;
  return (
    <UIPredicate predicate={predicate} columns={columns} onChange={setAST} />
  );
}
```
