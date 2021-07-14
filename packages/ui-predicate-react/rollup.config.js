import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import filesize from 'rollup-plugin-filesize';
import autoprefixer from 'autoprefixer';
import json from '@rollup/plugin-json';

import pkg from './package.json';

const EXTERNAL = ['react', 'react-dom', 'prop-types'];

// https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
const CJS_AND_ES_EXTERNALS = EXTERNAL.concat(/@babel\/runtime/);

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: 'src/index.js',
  output: {
    name: pkg.name,
    // we need to disable strict mode in the module output,
    // otherwise we'll get an error "ReferenceError: parcelRequire is not defined"
    // (see https://github.com/parcel-bundler/parcel/issues/1401)
    strict: false,
    file,
    format,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
  },
  external: ['cjs', 'es'].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
  plugins: [
    postcss({
      extract: false,
      plugins: [autoprefixer],
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    resolve({
      browser: true,
      resolveOnly: [/^(?!react$)/, /^(?!react-dom$)/, /^(?!prop-types)/],
    }),
    json(),
    commonjs(),
    filesize(),
  ],
}));

export default config;
