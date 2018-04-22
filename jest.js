const { resolve } = require('path');

const rootDir = process.cwd();

const coverageDirectory = resolve(rootDir, 'coverage');

module.exports = {
  coverageDirectory,
  coverageReporters: ['lcov'],
  rootDir,
};
