// build.webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  devServer: {
    hot: true,
    port: 3001,
    contentBase: "./dist",
    // index: "../index.html"
  },
  optimization: {
    moduleIds: 'named'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
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

      // 解析图片
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url=loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
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
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
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
            loader: 'cache-loader'
          },
          // 使用worker池运行loader
          {
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
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

    // 清空打包目录
    // new CleanWebpackPlugin(),


    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ]
}