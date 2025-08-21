const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');

module.exports = (_, argv) => {
  let envFile = '.env.local';

  if (argv.mode === 'development') {
    envFile = '.env.development';
  }
  if (argv.mode === 'production') {
    envFile = '.env.production';
  }

  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@assets': path.resolve(__dirname, 'src/@assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[name][hash][ext]',
          },
        },
        {
          test: /\.(webm)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[name].[hash][ext]',
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgo: true,
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: 'file-loader',
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new DotenvPlugin({
        path: envFile,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        templateParameters: {
          GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
        },
      }),
      new ForkTsCheckerWebpackPlugin({
        async: true,
      }),
    ],
    devServer: {
      static: './dist',
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
  };
};
