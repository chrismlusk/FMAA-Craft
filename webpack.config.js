const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const path = require("path");
require("dotenv").config();

module.exports = {
  entry: {
    main: "./src/scripts/main.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "web/dist")
  },
  devtool: "source-map",
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin({})],
    splitChunks: {
      automaticNameDelimiter: "-",
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "[name]-[contenthash].[ext]",
          outputPath: "fonts"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name]-[contenthash].[ext]",
          outputPath: "images"
        }
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      proxy: {
        target: process.env.PUBLIC_URL
      },
      ghostMode: {
        scroll: false,
        clicks: false,
        forms: false
      },
      open: false,
      notify: false
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["!fonts/**/*", "!images/**/*"]
    }),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],
  watchOptions: {
    ignored: ["./node_modules/"]
  },
  mode: "development"
};
