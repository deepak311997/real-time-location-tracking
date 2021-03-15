const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  stats: {
    children: true,
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  // devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../build', 'client'),
    filename: '[name].bundle.[chunkhash].js',
    pathinfo: true,
  },
  optimization: {
    splitChunks: {chunks: 'all'},
  },
  plugins: [
    new CleanWebpackPlugin('client'),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CopyWebpackPlugin([{from: path.resolve(__dirname, 'public'), to: 'assets/'}]),
  ],
  devServer: {
    port: 8080,
    contentBase: './dist',
    proxy: {
      '/api/**': {
        target: 'http://localhost:9090/',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: 'css-loader'},
          {loader: 'resolve-url-loader'},
          {loader: 'sass-loader?sourceMap'},
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [{loader: 'file-loader?name=img/[name].[ext]'}],
      },
    ],
  },
};
