/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // docgen: 'vue-component-meta',
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
