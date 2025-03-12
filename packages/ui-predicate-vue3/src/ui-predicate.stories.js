import { DEFAULT_CONFIG, DATASETS } from './__fixtures__';
import { action } from '@storybook/addon-actions';
import UIPredicate from './ui-predicate.vue';
import UITypes from 'ui-predicate-core';

export default {
  title: 'UIPredicate',
  component: UIPredicate,
  tags: ['autodocs'],
  args: {
    data: DATASETS.simple,
    columns: DEFAULT_CONFIG,
    ui: {}, // Spécifiez les options UI si nécessaire
  },
  argTypes: {
    data: {
      description: 'Predicate data definition',
    },
    columns: {
      description: 'Predicate columns definition',
    },
    error: {
      description: 'Emitted when the predicate-ui initialisation fails.',
    },
    initialized: {
      description: 'Emitted when the predicate-ui is initialized.',
    },
  }
};

const Template = (args) => ({
  template: '<ui-predicate :columns="columns" v-model="data" />',
  setup() {
    return { ...args };
  },
});

/**
  \`<ui-predicate/>\` requires a \`columns\` object and predicate v-model.
  That's how you will pass your \`targets\`,\`operators\` , \`types\` and \`logicalTypes\`.
 */
export const MinimalConfiguration = Template.bind({});

export const Events = {
  render: (args) => ({
    setup() {
      return { ...args };
    },
    template: '<ui-predicate :columns="columns" v-model="data" @changed="onChange" @initialized="onInit"></ui-predicate>',
  }),
  args: {
    onChanged: action('`changed` event'),
    onInit: action('`initialized` event'),
  },
};

/**
* If you need to override defaults ui-predicate UI components to match your needs, use the `ui` prop.

```javascript
import { UITypes } from "ui-predicate-core";
const MyCustomComponent = {};

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
 */

export const CustomizeDefaultUIComponents = {
  render: (args) => ({
    setup() {
      return { ...args };
    },
    template: `<ui-predicate
         :columns="columns"
         v-model="data"
         :ui="ui"
         @changed="onChange"
         @initialized="onInit"/>`,
  }),
  args: {
    data: DATASETS.advanced,
    columns: DEFAULT_CONFIG,
    ui: {
      [UITypes.TARGETS]: {
        props: {
          columns: {
            type: Object,
            required: true,
          },
          predicate: {
            type: Object,
            required: true,
          },
        },
        template: `
          <div>
            <input
              id="targets-selector"
              list="targets-datalist"
              :value="predicate.target.target_id"
            >
            <datalist
              id="targets-datalist"
              @changed="$emit('changed', $event.target.value)">
              <option
                  v-for="target in columns.targets"
                  :key="target.target_id"
                  :value="target.target_id">{{target.label}}
              </option>
            </datalist>
          </div>
        `,
      },
    },
    onChanged: action('`changed` event'),
    onInit: action('`initialized` event'),
  },
};

/**
 * Please prefer to override your own ui-predicate core components (see Customize default UI components).

  #### CSS class names

  - \`.ui-predicate__main\`: select the whole ui-predicate div container
  - \`.ui-predicate__row\`: select every rows div container
  - \`.ui-predicate__row--compound\`: select every predicate compound row div containers
  - \`.ui-predicate__row--comparison\`: select every predicate comparison row div containers
  - \`.ui-predicate__col\`: select every column (targets, operators, arguments and option) div containers
  - \`.ui-predicate__targets\`: select the every target columns div container
  - \`.ui-predicate__operators\`: select every operators div container
  - \`.ui-predicate__arguments\`: select every arguments div container
  - \`.ui-predicate__options\`: select every option div container
  - \`.ui-predicate__option\`: select one option div container
  - \`.ui-predicate__logic\`: select every logic div container
 */

export const CustomizeCSS = {
  render: (args) => ({
    setup() {
      return { ...args };
    },
    template: `<ui-predicate
      class="custom-css"
      :columns="columns"
      v-model="data"
      @changed="onChange"
      @initialized="onInit"/>`,
  }),
  args: {
    onChanged: action('`changed` event'),
    onInit: action('`initialized` event'),
  },
};
