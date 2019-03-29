var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',

  module: {
    rules: [
      // use babel-loader for js files
      { test: /\.js$/, use: 'babel-loader' },
      // use vue-loader for .vue files
      { test: /\.vue$/, use: 'vue-loader' }, 
      // use css-loader for .css files
      /*{ test: /\.css$/, use: 'css-loader' }, 
      // use scss-loader for .css files
      { test: /\.scss$/, use: 'sass-loader' } */

          {      test: /\.(scss|sass)$/i,
            include: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src/scss'),
            ],
            loaders: ["css-loader", "sass-loader"]}
            
    ]
  },
  // default for pretty much every project
  context: __dirname,
  // specify your entry/main file
  output: {
    // specify your output directory...
    path: path.resolve(__dirname, './dist'),
    // and filename
    filename: 'vue-simple-date-piker.js'
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
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
  ])
}