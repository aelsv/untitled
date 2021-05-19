const paths = require('./paths');
const { getEnvironment } = require('./env');
const { DefinePlugin, ProgressPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

const env = getEnvironment();
const { IS_DEVELOPMENT, NODE_ENV } = env.raw;

module.exports = {
  name: 'server',
  target: 'node',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  ...(IS_DEVELOPMENT && { devtool: 'inline-source-map' }),
  entry: paths.entryServerJS,
  output: {
    filename: IS_DEVELOPMENT ? 'dev-server-bundle.js' : 'prod-server-bundle.js',
    chunkFilename: '[name].js',
    path: paths.outputFolder,
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules'].concat(paths.source),
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
          ],
          plugins: ['react-hot-loader/babel'],
        },
      },
    ],
  },
  plugins: [
    new DefinePlugin(env.definedPlugin),
    new ProgressPlugin({
      entries: false,
      activeModules: false,
    }),
  ],
  performance: { hints: false },
};
