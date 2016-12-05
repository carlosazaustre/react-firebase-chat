const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: ['./src/index.jsx'],
  output: {
    filename: 'app.js',
    path: './public',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /(\.js|.jsx)$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './src/assets/index.html' })
  ]
}
