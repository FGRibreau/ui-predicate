import Vue from 'vue';
import { storiesOf } from '@storybook/vue';

import { action, actions } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds/vue';
import Centered from '@storybook/addon-centered';
import { withNotes } from '@storybook/addon-notes';

import {
  array,
  boolean,
  button,
  color,
  date,
  number,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs/vue';

import DEFAULT_CONFIG from './__fixtures__';

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
    'events|@onChange',
    () => ({
      template:
        '<ui-predicate :config="config" @onChange="onChange"></ui-predicate>',
      data() {
        return { config: DEFAULT_CONFIG };
      },
      methods: { onChange: action('onChange') },
    }),
    { notes: '' }
  );
