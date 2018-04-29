module.exports = {
  moduleNameMapper: { '^vue$': 'vue/dist/vue.common.js' },
  transform: {
    // Although latest versions of Node already supports most ES2015 features, you may still want to use ES modules syntax and stage-x features in your tests.
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  transformIgnorePatterns: ['/node_modules/(?!(@storybook/.*\\.vue$))'],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json', 'node'],

  // support the same @ -> src alias mapping in source code
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
};
