<center>
<h2 align="center">VueJS ui-predicate component</h2>
<p align="center">
<a href="https://www.npmjs.com/package/ui-predicate-vue"><img src="https://img.shields.io/npm/v/ui-predicate-vue.svg" /></a> <a href="https://www.jsdelivr.com/package/npm/ui-predicate-vue"><img src="https://data.jsdelivr.com/v1/package/npm/ui-predicate-vue/badge" /></a><br/>
</p>
</center>

<!--
(todo - insert logo)
(todo - insert screenshot)
-->

## Introduction

ui-predicate-vue is a rules editor, predicates component, for Vue JS 3. It aims to provide a clean, semantic and reusable component that make building your filtering or rules user interface a breeze.

## Documentation

Checkout the [getting-started](https://ui-predicate.fgribreau.com/ui-predicate-vue3/latest#/getting-started), [storybook](https://ui-predicate.fgribreau.com/ui-predicate-vue3/latest#/examples) or the [API documentation](https://ui-predicate.fgribreau.com/ui-predicate-vue3/latest).

## One minute Quick-start

[Read the code](./getting-started) or [try it online](https://ui-predicate.fgribreau.com/ui-predicate-vue3/latest#/getting-started).

## Installation

```bash
# npm
npm install ui-predicate-vue3 -S
```

```bash
# yarn
yarn add ui-predicate-vue3
```

# Setup

```js
import { createApp } from 'vue';

import UIPredicate from 'ui-predicate-vue3';

const app = createApp({
  /* root component options */
});

app.use(UIPredicate);

app.mount('#app');
```

# Usage

```html
<template>
  <div>
    <ui-predicate
      v-model="predicate"
      :columns="columns"
      @change="onChange"
      @initialized="onInitialized"
    />
  </div>
</template>
```

### Composition API

```js
<script setup>
import { ref } from 'vue';

const predicate = ref({
  logicalType_id: 'all',
  predicates: [
    {
      target_id: 'article.videoCount',
      operator_id: 'isEqualTo',
      argument: 42,
    },
  ],
});

const columns = {
  targets: [
    {
      target_id: 'article.title',
      label: 'Article title',
      type_id: 'string',
    },
    {
      target_id: 'article.videoCount',
      label: 'Article video count',
      type_id: 'int',
    },
    {
      target_id: 'article.publishingAt',
      label: 'Article publish date',
      type_id: 'datetime',
    },
  ],
  // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
  operators: [
    {
      operator_id: 'is',
      label: 'is',
      argumentType_id: 'smallString',
    },
    {
      operator_id: 'contains',
      label: 'Contains',
      argumentType_id: 'smallString',
    },
    {
      operator_id: 'isLowerThan',
      label: '<',
      argumentType_id: 'number',
    },
    {
      operator_id: 'isEqualTo',
      label: '=',
      argumentType_id: 'number',
    },
    {
      operator_id: 'isHigherThan',
      label: '>',
      argumentType_id: 'number',
    },
    {
      operator_id: 'is_date',
      label: 'is',
      argumentType_id: 'datepicker',
    },
  ],
  types: [
    {
      type_id: 'int',
      operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
    },
    {
      type_id: 'string',
      operator_ids: ['is', 'contains'],
    },
    {
      type_id: 'datetime',
      operator_ids: ['is_date'],
    },
  ],
  logicalTypes: [
    {
      logicalType_id: 'any',
      label: 'Any',
    },
    {
      logicalType_id: 'all',
      label: 'All',
    },
    {
      logicalType_id: 'none',
      label: 'None',
    },
  ],
}

const onChange = (data) => {
   console.log('Predicate changed', data);
};

const onInitialized = (ctrl) => {
    console.log('UIPredicate initialized', ctrl);
}
</script>

```

### Options API

```js
<script>
export default {
  data() {
    return {
      predicate: {
        logicalType_id: 'all',
        predicates: [
          {
            "target_id": "article.videoCount",
            "operator_id": "isEqualTo",
            "argument": 42
          },
        ],
      },
      columns: {
        targets: [
          {
            target_id: 'article.title',
            label: 'Article title',
            type_id: 'string',
          },
          {
            target_id: 'article.videoCount',
            label: 'Article video count',
            type_id: 'int',
          },
          {
            target_id: 'article.publishingAt',
            label: 'Article publish date',
            type_id: 'datetime',
          },
        ],
        // besides array list names, everything else follows convention https://github.com/FGRibreau/sql-convention
        operators: [
          {
            operator_id: 'is',
            label: 'is',
            argumentType_id: 'smallString',
          },
          {
            operator_id: 'contains',
            label: 'Contains',
            argumentType_id: 'smallString',
          },
          {
            operator_id: 'isLowerThan',
            label: '<',
            argumentType_id: 'number',
          },
          {
            operator_id: 'isEqualTo',
            label: '=',
            argumentType_id: 'number',
          },
          {
            operator_id: 'isHigherThan',
            label: '>',
            argumentType_id: 'number',
          },
          {
            operator_id: 'is_date',
            label: 'is',
            argumentType_id: 'datepicker',
          },
        ],
        types: [
          {
            type_id: 'int',
            operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
          },
          {
            type_id: 'string',
            operator_ids: ['is', 'contains'],
          },
          {
            type_id: 'datetime',
            operator_ids: ['is_date'],
          },
        ],
        logicalTypes: [
          {
            logicalType_id: 'any',
            label: 'Any',
          },
          {
            logicalType_id: 'all',
            label: 'All',
          },
          {
            logicalType_id: 'none',
            label: 'None',
          },
        ],
      },
    };
  },
  methods: {
    onChange(diff) {
      console.log('Predicate changed', diff);
    },
  },
};
</script>

```
