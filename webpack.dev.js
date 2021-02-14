const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const devMode = process.env.NODE_ENV !== "production";

module.exports = merge(common, {
  mode: "development",
  devtool: devMode ? "eval" : "source-map",
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    compress: true,
    host: "localhost",
    hot: true,
    port: 9019,
    inline: true,
  },
});
