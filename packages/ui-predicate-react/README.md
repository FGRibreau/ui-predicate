<center>
<h2 align="center">React ui-predicate component</h2>
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
import React, { Component } from 'react';
const UIPredicate from 'ui-predicate-react'

const columns = {
    targets: [ /*... your columns to filter on */ ],
    types: [ /* input types for values */ ],
    operators: [ /* is, between, etc.... */ ],
    argumentTypes: [ /* define the components to use */ ],
}

class MyExample extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(fullTree) {
        /* do stuff... */
    }

    render() {
        <UIPredicate
            columns={columns}
            onChange={serializedTree => this.handleChange(serializedTree)}
        />
    }
}

```
