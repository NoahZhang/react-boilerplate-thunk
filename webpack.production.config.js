var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    main: ['babel-polyfill', path.resolve(__dirname, 'app/main.jsx')],
    vendor: [
      'lodash',
      'react',
      'redux',
      'immutable',
      'moment',
    ]
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    loaders:[
      { test: /\.css$/, include: [path.resolve(__dirname, 'app'), path.resolve(__dirname, 'node_modules')], loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      config: 'app/config/config.' + (process.env.NODE_ENV || 'development')
    },
    extensions: ['', '.js', '.jsx'],
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new ManifestPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new uglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
        template: './build/template.html',
        filename: 'index.html',
        inject: 'body',
        chunks: ['main', 'vendor']
    }),
    new CopyWebpackPlugin([
      { from: './app/favicon.ico', to: 'favicon.ico' },
      { from: './app/assets', to: 'assets'},
      { from: './app/locales', to: 'locales'}
    ])
  ]
};