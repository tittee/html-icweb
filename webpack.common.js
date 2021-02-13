const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const devMode = process.env.NODE_ENV !== "production";
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // mode: devMode ? "development" : "production",
  // devtool: devMode ? "eval" : "source-map",
  entry: ["./src/scss/styles.scss", "./src/js/index.js"],

  output: {
    path: path.resolve(__dirname, "./assets"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    compress: true,
    host: "localhost",
    hot: true,
    // lazy: true,
    // filename: "index.html",
    // noInfo: true,
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
    port: 9000,
    inline: false,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: { importLoaders: 2 },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-import", "cssnano"],
              },
            },
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
                includePaths: ["/node_modules"],
              },
              webpackImporter: true,
            },
          },
        ],
      },

      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },

      // {
      //   test: /\.(jpg|jpeg|gif|png|svg)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "images/",
      //       },
      //     },
      //   ],
      //   // loader:'url-loader?limit=1024&name=images/[name].[ext]'
      // },
      // {
      //   test: /\.(woff|woff2|eot|ttf)$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //         outputPath: "fonts",
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/templates/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].css",
      chunkFilename: devMode ? "[name].css" : "[name].css",
    }),
  ],
  resolve: {
    modules: ["node_modules"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
