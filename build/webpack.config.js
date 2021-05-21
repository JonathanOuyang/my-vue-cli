// build.webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');
module.exports = {
  // 打包模式
  mode: 'development',
  entry: {
    // 配置入口文件
    main: [
      path.resolve(__dirname, '../src/main.js')
    ]
  },
  output: {
    // 配置输出
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: './'
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: path.resolve(__dirname, "../public"),
    index: "public/index.html"
  },
  optimization: {
    moduleIds: 'named'
  },
  module: {
    // es6+转es5
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 解析scss和css
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          },
          // 添加css前缀
          {
            loader: 'postcss-loader'
          }
        ]
      },
      
    ]
  },
  plugins: [
    // 创建html页面，自动引入打包生成的js文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),

    // 清空打包目录
    new CleanWebpackPlugin(),

    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ]
}