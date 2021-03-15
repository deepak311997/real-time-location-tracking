const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  stats: {
    children: true,
  },
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, '../build', 'server'),
    pathinfo: true,
    filename: 'server.js',
  },
  node: {
    __dirname: true
  },
  plugins: [
    new CleanWebpackPlugin('server'),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, 'src', 'config.json'), to: ''},
      {from: path.resolve(__dirname, 'src', 'geoJson.json'), to: ''},
    ]),
  ],
};
