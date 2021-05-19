import path from 'path';
import helmet from 'helmet';
import express from 'express';
import appRoot from 'app-root-path';
import paths from '../../../config/paths';

const production = (app, env) => {
  const { RESOURCE_URL_PATH_PREFIX } = env;

  app.use(helmet());

  /* bundle file from render folder inside server */
  const render = require(path.join(appRoot.path, 'build', 'prod-server-bundle.js')).default;

  /* set max cache for 30 days */
  /* eslint-disable-next-line @typescript-eslint/no-magic-numbers */
  const maxAge = 30 * 24 * 60 * 60 * 1000;

  /* static resources */
  app.use(RESOURCE_URL_PATH_PREFIX, express.static(paths.outputFolder, { maxAge }));

  /* React app */
  app.get('*', render({ env: process.env }));
};

export default production;
