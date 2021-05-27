import ip from 'ip';
import chalk from 'chalk';
import express from 'express';
import useragent from 'express-useragent';

/* Run modes */
import development from './environments/development';
import production from './environments/production';

/* @Constants */
import { IS_DEVELOPMENT } from 'config';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(useragent.express());

if (IS_DEVELOPMENT) {
  development(app);
} else {
  production(app);
}

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  if (IS_DEVELOPMENT) {
    console.log(`You can view ${chalk.cyan.bold(process.env.npm_package_name)} in the browser.`);
    console.log(`Your local address: ${chalk.yellow.bold(`http://${ip.address()}:${PORT}`)}\n`);
  }
});
