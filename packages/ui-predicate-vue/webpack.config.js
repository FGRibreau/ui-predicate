const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            js: 'babel-loader'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: { alias: { vue$: 'vue/dist/vue.esm.js' }

},
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          // http://vue-loader.vuejs.org/en/workflow/production.html
          new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
          new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: { warnings: false }
          }),
          new webpack.LoaderOptionsPlugin({ minimize: true })
        ]
      : [
          new webpack.optimize.UglifyJsPlugin({
            compress: false,
            mangle: false
          })
        ],
  performance: { hints: false },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') module.exports.devtool = '#source-map';
