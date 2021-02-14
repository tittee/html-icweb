const paths = require('./paths')
const path = require('path');


// const common = require("./webpack.common.js");

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  devtool: false,
  entry: ["./src/scss/index.scss", "./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },  
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          {
            loader : 'postcss-loader',
            options : {
              postcssOptions: {
                plugins: ["postcss-import", "cssnano"],
              },
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                // outputStyle: "compressed",
                includePaths: ["/node_modules"],
              },
              webpackImporter: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
            },
          },
          // loader:'url-loader?limit=1024&name=images/[name].[ext]'
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production    
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      title: 'IC WEB',
      // template: paths.src + '/templates/index.html', // template file
      template: path.resolve(__dirname, '../src/templates/index.html'),
      filename: "index.html",      
      inject: 'false'
    }),
    
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../pubilc'),
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  resolve: {
    modules: ["node_modules"],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
