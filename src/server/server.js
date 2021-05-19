import ip from 'ip';
import chalk from 'chalk';
import express from 'express';
import useragent from 'express-useragent';

/* Run modes */
import development from './environments/development';
// import production from './environments/production';

/* @Constants */
import { getContextValue, initServerContext, getAllContext } from '../service/context';

initServerContext(process.env);

const app = express();
const { PORT } = process.env;

app.use(useragent.express());

if (getContextValue('IS_DEVELOPMENT_BUILD')) {
  development(app, getAllContext());
} else {
  /* production(app, getAllContext()); */
}

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  if (getContextValue('IS_DEVELOPMENT_BUILD')) {
    console.log(`You can view ${chalk.cyan.bold(process.env.npm_package_name)} in the browser.`);
    console.log(`Your local address: ${chalk.yellow.bold(`http://${ip.address()}:${PORT}`)}\n`);
  }
});
