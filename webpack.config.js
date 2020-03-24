const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const crypto = require('crypto');

module.exports = {
  entry: './src/index.js', // define more entrypoints to trigger common and shared chunks
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  optimization: {
    splitChunks: {
      chunks: `all`,
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true
        },
        lib: {
          test(module) {
            return (
              module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier())
            );
          },
          name(module) {
            const hash = crypto.createHash(`sha1`)
            hash.update(module.libIdent({ context: program.directory }))

            return hash.digest(`hex`).substring(0, 8)          
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true
        },
        commons: {
          name: 'commons',
          minChunks: 3, // total pages
          priority: 20
        },
        shared: {
          name(module, chunks) {
            const hash = crypto
              .createHash(`sha1`)
              .update(chunks.reduce((acc, chunk) => acc + chunk.name, ``))
              .digest(`hex`)

            return hash
          },
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true
        }
      }
    }
  }
};
