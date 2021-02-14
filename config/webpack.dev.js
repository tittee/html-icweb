const path = require("path");
const webpack = require('webpack')
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    compress: true,
    host: "localhost",
    hot: true,
    port: 9001,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
});