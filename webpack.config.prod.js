import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
   main: path.resolve(__dirname, 'src/index'),
   vendor: path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    //for cache busting
    new WebpackMd5Hash(),
    //chunk common files so they are bundled seperately
    new webpack.optimize.CommonsChunkPlugin(
      {
        name:"vendor"
      }
    ),
    //create html file that refs bundled files
    new HtmlWebpackPlugin({
      template:'src/index.html',
      minify:{
        removeComments: true,
        collapseWhitespace:true,
        removeRedundantAttributes:true,
        useShortDoctype:true,
removeEmptyAttributes:true,
removeStyleLinkTypeAttributes:true,
keepClosingSlash:true,
minifyJs:true,
minifyCSS:true,
minifyURLs:true
      },
      inject: true,
      //custom tokens here
      trackJSToken:"test"
    }),
    //remove duplicate packages
    new webpack.optimize.DedupePlugin(),
    //minify
    new webpack.optimize.UglifyJsPlugin()
  ]
  ,
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
