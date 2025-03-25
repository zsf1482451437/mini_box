const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true
              }
            }
          }
        ]
      }
    ]
  },
  sass: {
    quietDeps: true
  }
}
