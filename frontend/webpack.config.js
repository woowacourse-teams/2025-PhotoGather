const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/favicon.ico', to: 'favicon.ico' },
          { from: 'public/favicon-32x32.png', to: 'favicon-32x32.png' },
          { from: 'public/favicon-16x16.png', to: 'favicon-16x16.png' },
          { from: 'public/apple-touch-icon.png', to: 'apple-touch-icon.png' },
        ],
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
        {
          directory: path.join(__dirname, 'public'),
          publicPath: '/',
        },
      ],
      port: 3000,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                png: { quality: 80, palette: true },
                jpg: { quality: 75, progressive: true },
                jpeg: { quality: 75, progressive: true },
              },
            },
          },
          generator: [
            {
              preset: 'webp',
              implementation: ImageMinimizerPlugin.sharpGenerate,
              options: {
                encodeOptions: {
                  webp: { quality: 80, effort: 6, lossless: false },
                },
              },
              filename: 'static/images/[name][ext]',
            },
          ],
        }),
      ],
    },
  };
};
