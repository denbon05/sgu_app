// @ts-check

import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist', 'public'), // '/assets/'
  },
  devServer: {
    host: 'localhost',
    publicPath: '/assets/',
    port: 8080,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
