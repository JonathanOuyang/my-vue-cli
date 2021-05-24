// build/webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: {
    // 配置入口文件
    main: [path.resolve(__dirname, "../src/main.js")]
  },
  output: {
    // 配置输出
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].js",
    publicPath: "/"
  },

  // 开发服务
  devServer: {
    hot: true,
    port: 3001,
    contentBase: "./dist"
  },
  optimization: {
    moduleIds: "named"
  },
  resolve: {
    // 自动解析确定的扩展名
    extensions: [".js", ".vue"],

    // v5
    alias: {
      process: "process/browser"
    }
  },
  module: {
    // es6+转es5
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },

      // 解析图片
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url=loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]"
                }
              }
            }
          }
        ]
      },

      // 解析字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4096,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]"
                }
              }
            }
          }
        ]
      },

      // 解析vue文件
      {
        test: /\.vue$/,
        use: [
          // 缓存编译结果
          {
            loader: "cache-loader"
          },
          // 使用worker池运行loader
          {
            loader: "thread-loader"
          },
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),

    // 创建html页面，自动引入打包生成的js文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),

    // v4
    // new webpack.NamedModulesPlugin(),

    // 热更新
    new webpack.HotModuleReplacementPlugin(),

    // v5
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  ]
};
