import { setup } from '@storybook/vue3';
import UIPredicateVue from "./../src/index";

setup((app) => {
  app.use(UIPredicateVue);
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // viewMode: 'docs',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
