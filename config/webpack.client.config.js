const path = require('path');
const paths = require('./paths');
const { getClientEnvironment } = require('./env');
const TerserPlugin = require('terser-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { DefinePlugin, ProgressPlugin, HotModuleReplacementPlugin } = require('webpack');

const env = getClientEnvironment();
const { IS_DEVELOPMENT, IS_PRODUCTION, NODE_ENV } = env.raw;
const RESOURCE_URL_PATH_PREFIX = env.raw.RESOURCE_URL_PATH_PREFIX || '/';
const webpackHotEntry = 'webpack-hot-middleware/client?reload=false&dynamicPublicPath=true';

module.exports = {
  name: 'client',
  target: 'web',
  mode: NODE_ENV,
  ...(IS_DEVELOPMENT && {
    devtool: 'cheap-module-source-map',
    devServer: {
      hot: true,
      overlay: true,
      serverSideRender: true,
      stats: {
        all: false,
        modules: true,
        errors: true,
        warnings: true,
        logging: 'warn',
        colors: true,
        builtAt: true,
      },
      historyApiFallback: true,
      watchOptions: { ignored: ignoredFiles(paths.source) },
      contentBase: paths.outputFolder,
      publicPath: '/',
      writeToDisk: true,
    },
  }),
  entry: {
    app: [require.resolve('./polyfills'), 'react-hot-loader/patch', webpackHotEntry, paths.entryClientJS],
  },
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: paths.outputFolder,
    publicPath: RESOURCE_URL_PATH_PREFIX,
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      env.raw.NODE_PATH.split(path.delimiter).filter(Boolean),
      paths.source,
    ),
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
      },
    },
    ...(IS_PRODUCTION && {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
      ],
    }),
  },
  module: {
    rules: [
      /* JSX */
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: paths.source,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new LoadablePlugin(),
    new DefinePlugin(env.definedPlugin),
    new ProgressPlugin({
      entries: false,
      activeModules: false,
    }),
    ...(IS_DEVELOPMENT && [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]),
  ],
  performance: { hints: false },
};
