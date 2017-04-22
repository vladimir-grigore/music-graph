const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            "transform-object-rest-spread",
            "transform-decorators-legacy",
            "transform-class-properties",
            "transform-regenerator"
          ],
        }
      }
    }]
  }
};

