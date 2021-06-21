import React from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_CONFIG, DATASETS } from '../__fixtures__';
import { UIPredicate } from './';

import minimalConfigurationNote from '../../docs/notes/minimal-configuration.md';
import customizeDefaultUiComponentsNote from '../../docs/notes/customize-default-ui-components.md';
import customizeCSSNote from '../../docs/notes/customize-css.md';

const { UITypes } = require('ui-predicate-core');

export default {
  title: 'UIPredicate',
  component: UIPredicate,
  argTypes: {
    onChange: { action: '`change` event' },
  },
};

const Template = args => <UIPredicate {...args} />;

export const MinimalConfiguration = Template.bind({});
Object.assign(MinimalConfiguration, {
  args: {
    data: DATASETS.simple,
    columns: DEFAULT_CONFIG,
  },
  parameters: {
    notes: minimalConfigurationNote,
  },
});

export const Events = Template.bind({});
Object.assign(Events, {
  args: {
    data: DATASETS.advanced,
    columns: DEFAULT_CONFIG,
  },
});

function CustomizedComponent({ predicate, columns, onChange }) {
  return (
    <div>
      <input
        id="targets-selector"
        list="targets-datalist"
        defaultValue={predicate.target.target_id}
      />
      <datalist id="targets-datalist" onChange={e => onChange(e.target.value)}>
        {columns.targets.map(target => {
          return (
            <option key={target.target_id} value={target.target_id}>
              {target.label}
            </option>
          );
        })}
      </datalist>
    </div>
  );
}
CustomizedComponent.propTypes = {
  predicate: PropTypes.object,
  columns: PropTypes.object,
  onChange: PropTypes.func,
};
export const CustomizeDefaultUIComponents = Template.bind({});
Object.assign(CustomizeDefaultUIComponents, {
  args: {
    columns: DEFAULT_CONFIG,
    data: DATASETS.advanced,
    ui: {
      [UITypes.TARGETS]: CustomizedComponent,
    },
  },
  parameters: {
    notes: customizeDefaultUiComponentsNote,
  },
});

export const CustomizeCSS = Template.bind({});
Object.assign(CustomizeCSS, {
  args: {
    data: DATASETS.advanced,
    columns: DEFAULT_CONFIG,
    className: 'custom-css',
  },
  parameters: {
    notes: customizeCSSNote,
  },
});
