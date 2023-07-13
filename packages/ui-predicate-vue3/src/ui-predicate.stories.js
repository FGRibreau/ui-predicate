import vue from 'vue';
import { DEFAULT_CONFIG, DATASETS } from './__fixtures__';
import { install } from './';
import { action } from '@storybook/addon-actions';
const { UITypes } = require('ui-predicate-core');
import UIPredicate from './ui-predicate';
import { withKnobs, select } from '@storybook/addon-knobs';

install(vue);

export default {
  title: 'ui-predicate',
  decorators: [withKnobs],
};

export const MinimalConfiguration = () => ({
  components: { UIPredicate },
  template: '<ui-predicate :columns="columns" :data="data" />',
  data() {
    return {
      columns: DEFAULT_CONFIG,
      data: DATASETS.simple,
    };
  },
});
MinimalConfiguration.story = {
  parameters: {
    notes: {
      markdown: `
        ## minimal configuration
        \`<ui-predicate/>\` only requires a \`columns\` object.
        That's how you will pass your \`targets\`,\`operators\` , \`types\` and \`logicalTypes\`.
      `,
    },
  },
};

export const Events = () => ({
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
});

export const CustomizeDefaultUIComponents = () => ({
  template: `<ui-predicate
    :columns="columns"
    :data="data"
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
});
CustomizeDefaultUIComponents.story = {
  parameters: {
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
  },
};

export const CustomizeCSS = () => ({
  template: `<ui-predicate
    class="custom-css"
    :columns="columns"
    :data="data"
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
});
CustomizeCSS.story = {
  parameters: {
    notes: {
      markdown: `
        Please prefer to override your own ui-predicate core components (see Customize default UI components).

        ## CSS class names

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
      `,
    },
  },
};

export const LoadDumpData = () => {
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
      };
    },
    computed: {
      data: () => DATASETS[selection],
    },
    methods: {
      onChange(serialized) {
        this.serialized = serialized;
      },
    },
  };
};
