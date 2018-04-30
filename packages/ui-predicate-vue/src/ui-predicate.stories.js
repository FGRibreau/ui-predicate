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
    'events',
    () => ({
      template:
        '<ui-predicate :config="config" @changed="onChange" @initialized="onInit"></ui-predicate>',
      data() {
        return { config: DEFAULT_CONFIG };
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

      const datasets = {
        simple: {
          logicalType_id: 'any',
          predicates: [
            {
              target_id: 'article.videoCount',
              operator_id: 'isHigherThan',
              arguments: [],
            },
          ],
        },
        advanced: {
          logicalType_id: 'all',
          predicates: [
            {
              target_id: 'article.title',
              operator_id: 'is',
              arguments: [],
            },
            {
              target_id: 'article.videoCount',
              operator_id: 'isHigherThan',
              arguments: [],
            },
            {
              target_id: 'article.title',
              operator_id: 'is',
              arguments: [],
            },
            {
              logicalType_id: 'none',
              predicates: [
                {
                  target_id: 'article.videoCount',
                  operator_id: 'isHigherThan',
                  arguments: [],
                },
                {
                  target_id: 'article.publishingAt',
                  operator_id: 'is',
                  arguments: [],
                },
              ],
            },
          ],
        },
      };

      const selection = select('Example', options, 'simple');

      return {
        template: `<div class="columns" style="display:flex;width: 80vw;height:90vh">
          <div style="flex-direction:row;width:40vw"><ui-predicate :config="config" :data="data" @changed="onChange" @initialized="onChange"></ui-predicate></div>
          <div style="flex-direction:row;width:40vw"><textarea style="width:100%;height:100%">{{ serialized }}</textarea></div>
        </div>`,
        data() {
          return {
            config: DEFAULT_CONFIG,
            serialized: '',
            data: datasets[selection],
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
