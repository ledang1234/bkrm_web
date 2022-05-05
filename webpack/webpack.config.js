const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', './src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '..', './public/index.html'),
    }),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        filename: "[path][query]",
        algorithm: "gzip",
        deleteOriginalAssets: false,
      }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
  }
}