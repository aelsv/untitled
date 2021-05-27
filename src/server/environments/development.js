import path from 'path';
import appRoot from 'app-root-path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

/* @Constants */
import { RESOURCE_URL_PATH_PREFIX } from 'config';
import { setProxy } from 'server/config/setProxy';

const development = (app) => {
  const clientDevConfig = require(path.join(appRoot.path, 'config', 'webpack.client.config.js'));
  const serverDevConfig = require(path.join(appRoot.path, 'config', 'webpack.server.config.js'));

  const compiler = webpack([clientDevConfig, serverDevConfig]);

  app.use(RESOURCE_URL_PATH_PREFIX, express.static(path.join(appRoot.path, 'src', 'static')));

  app.get('*', webpackDevMiddleware(compiler, clientDevConfig.devServer));
  app.get(
    '*',
    webpackHotMiddleware(compiler.compilers[0], {
      path: `${RESOURCE_URL_PATH_PREFIX}/__webpack_hmr`,
    }),
  );
  app.get('*', webpackHotServerMiddleware(compiler));

  setProxy();
};

export default development;
