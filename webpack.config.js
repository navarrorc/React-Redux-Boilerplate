var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          exclude: /(node_modules)/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader!sass-loader?sourceMap'
        },
        {
          test: /\.(svg|ttf|woff|woff2|eot)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader"
        },
        {
          test: /\.png$/,
          loader: "url-loader!img-loader"
        }
    ]
  },
  devServer: {
    host: process.env.IP || 'localhost',
    port: parseInt(process.env.PORT) || 8080, // see: bit.ly/2kNJKli
    historyApiFallback: true,
    noInfo: false
  },
  performance: {
    hints: false
  },
  devtool: '#inline-source-map' //see: bit.ly/2i0EF8h '#eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  //inspired by: http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
