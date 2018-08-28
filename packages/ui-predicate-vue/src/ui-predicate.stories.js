import { storiesOf } from '@storybook/vue';

import { action } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds/vue';
import Centered from '@storybook/addon-centered';
import { withNotes } from '@storybook/addon-notes';

import {
  /* array,
  boolean,
  button,
  color,
  date,
  number,
  text,*/
  select,
  withKnobs,
} from '@storybook/addon-knobs/vue';

import { DEFAULT_CONFIG, DATASETS } from './__fixtures__';
const { UITypes } = require('ui-predicate-core');

storiesOf('ui-predicate', module)
  .addDecorator(Centered)
  .addDecorator(withKnobs)
  .addDecorator(withNotes)
  .addDecorator(
    backgrounds([
      {
        name: 'gray',
        value: 'whitesmoke',
        default: true,
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ])
  )
  .add(
    'minimal configuration',
    () => {
      return {
        template: '<ui-predicate :columns="columns" />',
        data() {
          return { columns: DEFAULT_CONFIG };
        },
      };
    },
    {
      notes: {
        markdown: `
      ## minimal configuration

      \`<ui-predicate/>\` only requires a \`columns\` object.
      That's how you will pass your \`targets\`,\`operators\` , \`types\` and \`logicalTypes\`.
    `,
      },
    }
  )
  .add(
    'events',
    () => ({
      template:
        '<ui-predicate :columns="columns" :data="data" @change="onChange" @initialized="onInit"></ui-predicate>',
      data() {
        return {
          columns: DEFAULT_CONFIG,
          data: DATASETS.advanced,
        };
      },
      methods: {
        onChange: action('`change` event'),
        onInit: action('`initialized` event'),
      },
    }),
    { notes: '' }
  )
  .add(
    'Customize default UI components',
    () => ({
      template: `<ui-predicate
          :columns="columns"
          :ui="ui"
          @change="onChange"
          @initialized="onInit"/>`,
      data() {
        return {
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
                    @change="$emit('change', $event.target.value)">
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
        };
      },
      methods: {
        onChange: action('`change` event'),
        onInit: action('`initialized` event'),
      },
    }),
    {
      notes: {
        markdown: `
          ## Core ui-predicate component override

          If you need to override defaults ui-predicate UI components to match your needs, use the \`ui\` prop.

          \`\`\`javascript
          import { UITypes } from 'ui-predicate-core';
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
            [UITypes.ARGUMENT_DEFAULT]: MyCustomComponent,
          };
          \`\`\`
        `,
      },
    }
  )
  .add(
    'Customize CSS',
    () => ({
      template: `<ui-predicate
              class="custom-css"
              :columns="columns"
              @change="onChange"
              @initialized="onInit"/>`,
      data() {
        return {
          data: DATASETS.advanced,
          columns: DEFAULT_CONFIG,
        };
      },
      methods: {
        onChange: action('`change` event'),
        onInit: action('`initialized` event'),
      },
    }),
    {
      notes: {
        markdown: `
          Please prefer to override your own ui-predicate core components (see Customize default UI components).

          ## CSS class names

          - \\\`.ui-predicate__main\\\`: select the whole ui-predicate div container
          - \\\`.ui-predicate__row\\\`: select every rows div container
          - \\\`.ui-predicate__row--compound\\\`: select every predicate compound row div containers
          - \\\`.ui-predicate__row--comparison\\\`: select every predicate comparison row div containers
          - \\\`.ui-predicate__col\\\`: select every column (targets, operators, arguments and option) div containers
          - \\\`.ui-predicate__col--targets\\\`: select the every target columns div container
          - \\\`.ui-predicate__col--operators\\\`: select every operators div container
          - \\\`.ui-predicate__col--arguments\\\`: select every arguments div container
          - \\\`.ui-predicate__col--option\\\`: select every option div container
          - \\\`.ui-predicate__col--logic\\\`: select every logic div container
        `,
      },
    }
  )
  .add(
    'load/dump data',
    () => {
      const options = {
        simple: 'Simple',
        advanced: 'Advanced',
      };

      const selection = select('Example', options, 'advanced');

      return {
        template: `<div class="columns" style="display:flex;width: 80vw;height:90vh">
          <div style="flex-direction:row;width:60vw"><ui-predicate :columns="columns" :data="data" @change="onChange" @initialized="onChange"></ui-predicate></div>
          <div style="flex-direction:row;width:20vw"><textarea style="width:100%;height:100%">{{ serialized }}</textarea></div>
        </div>`,
        data() {
          return {
            columns: DEFAULT_CONFIG,
            serialized: '',
            data: DATASETS[selection],
          };
        },
        methods: {
          onChange(serialized) {
            this.serialized = serialized;
          },
        },
      };
    },
    { notes: '' }
  );
