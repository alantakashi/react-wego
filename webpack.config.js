var path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-1', 'stage-2']
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@App': path.join(__dirname, './src/app'),
      '@Actions': path.join(__dirname, './src/actions/'),
      '@Components': path.join(__dirname, './src/components/'),
      '@Constants': path.join(__dirname, './src/constants/'),
      '@Layouts': path.join(__dirname, './src/layouts/'),
      '@Reducers': path.join(__dirname, './src/reducers/'),
      '@Routes': path.join(__dirname, './src/routes/'),
      '@Utils': path.join(__dirname, './src/utils/')
    },
    extensions: ['*', '.js']
  }
}
