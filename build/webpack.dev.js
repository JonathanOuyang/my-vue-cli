// build/webpack.dev.js
const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(webpackConfig, {
  mode: "development",

  // 原始源代码（仅限行）
  devtool: "eval-cheap-module-source-map",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          // 解析scss和css
          {
            loader: "style-loader"
          },
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
            loader: "postcss-loader",
            
          }
        ]
      }
    ]
  },

  plugins: [
    // 环境变量
    new webpack.DefinePlugin({
      "process.env": {
        TITLE: "'开发环境'"
      }
    })
  ]
});
