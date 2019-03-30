/* eslint-disable quote-props */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds';
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
} from '@storybook/addon-knobs/react';

import { UITypes } from 'ui-predicate-core';
import UIPredicate from './ui-predicate';

import { DEFAULT_CONFIG, DATASETS } from './__fixtures__';

storiesOf('UIPredicate', module)
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
      return <UIPredicate columns={DEFAULT_CONFIG} />;
    },
    {
      notes: {
        markdown: `
  ## minimal configuration

  \`<UIPredicate />\` only requires a \`columns\` object.
  That's how you will pass your \`targets\`,\`operators\` , \`types\` and \`logicalTypes\`.
`,
      },
    }
  )
  .add(
    'events',
    () => (
      <UIPredicate
        columns={DEFAULT_CONFIG}
        data={DATASETS.advanced}
        onChange={action('`change` event')}
        onInitialized={action('`initialized` event')}
      />
    ),
    { notes: '' }
  )
  .add(
    'Customize default UI components',
    () => {
      const ui = {
        [UITypes.TARGETS]: ({ predicate, columns, onChange }) => {
          return (
            <div>
              <input
                id="targets-selector"
                list="targets-datalist"
                value={predicate.target.target_id}
              />
              <datalist
                id="targets-datalist"
                onChange={ev => onChange(ev.target.value)}
              >
                {columns.targets.map(target => (
                  <option key={target.target_id} value={target.target_id}>
                    {target.label}
                  </option>
                ))}
              </datalist>
            </div>
          );
        },
      };

      return (
        <UIPredicate
          columns={DEFAULT_CONFIG}
          data={DATASETS.advanced}
          ui={ui}
          onChange={action('`change` event')}
          onInitialized={action('`initialized` event')}
        />
      );
    },
    {
      notes: {
        markdown: `
          ## Core ui-predicate component override

          If you need to override defaults ui-predicate UI components to match your needs, use the \`ui\` prop.

          \`\`\`javascript
          import { UITypes } from 'ui-predicate-core';
          const MyCustomComponent = {
            /* React Component Definition */
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
    () => (
      <UIPredicate
        className="custom-css"
        columns={DEFAULT_CONFIG}
        data={DATASETS.advanced}
        onChange={action('`change` event')}
        onInitialized={action('`initialized` event')}
      />
    ),
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
          - \\\`.ui-predicate__targets\\\`: select the every target columns div container
          - \\\`.ui-predicate__operators\\\`: select every operators div container
          - \\\`.ui-predicate__arguments\\\`: select every arguments div container
          - \\\`.ui-predicate__options\\\`: select every option div container
          - \\\`.ui-predicate__option\\\`: select one option div container
          - \\\`.ui-predicate__logic\\\`: select every logic div container
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

      const textareaRef = React.createRef();

      function updateSerialized(serialized) {
        action('`changeEvent` event')(serialized);
        if (textareaRef.current)
          textareaRef.current.value = JSON.stringify(serialized, null, 2);
      }

      function onInit(ctrl) {
        action('`initialized` event')(ctrl);
        if (ctrl) updateSerialized(ctrl.toJSON());
      }

      const selection = select('Example', options, 'advanced');
      return (
        <div
          className="columns"
          style={{ display: 'flex', width: '80vw', height: '90vh' }}
        >
          <div style={{ 'flex-direction': 'row', width: '60vw' }}>
            <UIPredicate
              columns={DEFAULT_CONFIG}
              data={DATASETS[selection]}
              onChange={serialized => updateSerialized(serialized)}
              onInitialized={ctrl => onInit(ctrl)}
            />
          </div>
          <div style={{ 'flex-direction': 'row', width: '20vw' }}>
            <textarea
              ref={textareaRef}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      );
    },
    { notes: '' }
  );
