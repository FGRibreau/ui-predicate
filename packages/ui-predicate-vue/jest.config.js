module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
  },
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  testMatch: [
    '<rootDir>/tests/**/*.spec.(js|jsx|ts|tsx)|<rootDir>/**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};
