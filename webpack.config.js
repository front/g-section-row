const path = require('path');
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require("autoprefixer");

const cleanBuild = new CleanWebpackPlugin(['build']);
const extractCSS = new ExtractTextPlugin('style.css');
const extractEditor = new ExtractTextPlugin('editor.css');


module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'React',
    wp: 'wp',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        // exclude: /node_modules/,
        exclude: [/node_modules/, /editor\.s?css$/],
        use: extractCSS.extract(['css-loader', 'postcss-loader', 'sass-loader']),
      },
      {
        test: /editor\.s?css$/,
        exclude: /node_modules/,
        use: extractEditor.extract(['css-loader', 'postcss-loader', 'sass-loader']),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
      },
    ],
  },
  mode: 'production',
  plugins: [
    cleanBuild,
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            grid: true,
            browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']  })
        ]
      }
    }),
    extractCSS,
    extractEditor,
  ],
};
