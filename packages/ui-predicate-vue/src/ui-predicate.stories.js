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
        template: '<ui-predicate :config="config"></ui-predicate>',
        data() {
          return { config: DEFAULT_CONFIG };
        },
      };
    },
    {
      notes: {
        markdown: `
      ## minimal configuration

      \`<ui-predicate/>\` only requires a \`config\` object.
      That's how you will pass your \`targets\`,\`operators\` , \`types\` and \`logicalTypes\`.

    `,
      },
    }
  )
  .add(
    'events',
    () => ({
      template:
        '<ui-predicate :config="config" :data="data" @changed="onChange" @initialized="onInit"></ui-predicate>',
      data() {
        return {
          config: DEFAULT_CONFIG,
          data: DATASETS.advanced,
        };
      },
      methods: {
        onChange: action('`changed` event'),
        onInit: action('`initialized` event'),
      },
    }),
    { notes: '' }
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
          <div style="flex-direction:row;width:60vw"><ui-predicate :config="config" :data="data" @changed="onChange" @initialized="onChange"></ui-predicate></div>
          <div style="flex-direction:row;width:20vw"><textarea style="width:100%;height:100%">{{ serialized }}</textarea></div>
        </div>`,
        data() {
          return {
            config: DEFAULT_CONFIG,
            serialized: '',
            data: DATASETS[selection],
          };
        },
        methods: {
          onChange(ctrl) {
            this.serialized = ctrl.toJSON();
          },
        },
      };
    },
    { notes: '' }
  );
