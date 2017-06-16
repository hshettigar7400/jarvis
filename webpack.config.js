// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/app',
  entry: {
    index: './index.js',
    framework: './framework.js'
  },
  output: {
    path: __dirname + '/build',
    filename: "[name].bundle.js",
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  devServer: {
    host: '0.0.0.0',
    port: 8008,
    compress: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=100000000'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      }
    ]
 }
}
