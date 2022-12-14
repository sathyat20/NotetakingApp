const env = process.env.NODE_ENV || 'development';
// set to 'production' or 'development' in your env

const autoprefixer = require('autoprefixer');
const postcssPresets = require('postcss-preset-env');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' };

module.exports = {
  mode: env,
  entry: ['./src'], // this is where our app lives
  devtool: 'source-map', // this enables debugging with source in chrome devtools
  module: {
    
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ //this is the part you want to add
            { loader: 'babel-loader'},
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
          type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash][ext][query]',
        },
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  postcssPresets({ browsers: 'last 2 versions' }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [    
    new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html',
    favicon: './src/favicon.jpg',
  }),
    new ESLintPlugin({}),
    new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    devServer: {
        hot: true,
      },
};