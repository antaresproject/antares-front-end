const merge = require('webpack-merge');
const common = require('./webpack.common.babel.js');
const path = require('path');
module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, '_dist/'),
    compress: true,
    port: 9000,
    hotOnly: true, // If you do not want automatically reload page #1
    inline: false, // If you do not want automatically reload page #2
    host: '127.0.0.1',
    hot: true
    // https: true
  }
});
