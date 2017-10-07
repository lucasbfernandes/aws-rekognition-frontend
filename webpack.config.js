const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {

  entry: {
    app: [
      './src/main.js'
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      { test: /\.(png|svg|woff|woff2|ttf|eot)/, loader: 'file-loader' },
      { test: /\.(css|scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', 
            options: {
              data: '@import "variables";',
              includePaths: [path.resolve(__dirname, './src/core/style/')]
            }
          } 
        ]
      },
      { 
        test: /\.js(x)?$/, 
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      core: path.resolve(__dirname, './src/core'),
      modules: path.resolve(__dirname, './src/modules')
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin({
      filename: './src/css/[name].css',
      disable: false, 
      allChunks: true
    })
  ]
}