// Add this to a webpack.config.js file
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    site: ['./assets/javascripts/all.js'],
    style: ['./assets/stylesheets/all.css.scss'],
  },
  output: {
    path: path.resolve(__dirname, '.tmp/dist'),
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
};
