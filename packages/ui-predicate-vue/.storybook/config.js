import { configure } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';

import Vue from 'vue';

// Import your custom components.
import UIPredicate from '..';

// Install UIPredicate
Vue.use(UIPredicate);

setOptions({
  hierarchyRootSeparator: /\|/,
});

function loadStories() {
  // You can require as many stories as you need.
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
