const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');
const BabiliPlugin = require('babili-webpack-plugin');
module.exports = merge(common, {
  plugins: [new BabiliPlugin({}, require('babel-preset-babili'))]
});
