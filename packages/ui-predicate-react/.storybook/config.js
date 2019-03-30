import { configure } from '@storybook/react';

function loadStories() {
  // You can require as many stories as you need.
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
