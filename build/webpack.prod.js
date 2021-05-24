// build/webpack.prod.js
const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackConfig, {
  mode: "production",

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          // 解析scss和css
          MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader"
          // },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass")
            }
          },
          // 添加css前缀
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },

  plugins: [
    // 环境变量
    new webpack.DefinePlugin({
      "process.env": {
        TITLE: "'生产环境'"
      }
    }),

    // 设置public目录的打包位置
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist")
        }
      ]
    }),

    // css打包为独立文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    
    // 清空打包目录
    new CleanWebpackPlugin(),
  ]
});
