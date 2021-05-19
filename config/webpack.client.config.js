const paths = require('./paths');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin, ProgressPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { getEnvironment } = require('./env');

const env = getEnvironment();
const { RESOURCE_URL_PATH_PREFIX, IS_DEVELOPMENT, IS_PRODUCTION, NODE_ENV } = env.raw;
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
    app: [require.resolve('./polyfills'), paths.entryClientJS].concat(
      IS_DEVELOPMENT ? ['react-hot-loader/patch', webpackHotEntry] : [],
    ),
  },
  output: {
    filename: IS_DEVELOPMENT ? '[name].[hash].js' : '[name].[chunkhash].js',
    chunkFilename: IS_DEVELOPMENT ? '[name].[hash].js' : '[name].[chunkhash].js',
    path: paths.outputFolder,
    publicPath: RESOURCE_URL_PATH_PREFIX,
  },
  resolve: {
    modules: ['node_modules'].concat(paths.source),
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        },
      },
    },
    ...(IS_PRODUCTION && {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          terserOptions: {
            output: { comments: false },
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
        test: /\.(js|jsx|tsx|ts)$/,
        include: paths.source,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/env',
              {
                useBuiltIns: 'entry',
                modules: 'commonjs',
                corejs: 3,
              },
            ],
            '@babel/react',
          ],
        },
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new DefinePlugin(env.definedPlugin),
    new ProgressPlugin({
      entries: false,
      activeModules: false,
    }),
  ].concat(IS_DEVELOPMENT ? new CleanWebpackPlugin() : []),
  performance: { hints: false },
};
