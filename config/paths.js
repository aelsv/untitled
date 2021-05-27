const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  source: resolveApp('src'),
  outputFolder: resolveApp('build'),
  entryClientJS: resolveApp('src/client.js'),
  entryServerJS: resolveApp('src/server/render/index.js'),
  appNodeModules: resolveApp('node_modules'),
};
