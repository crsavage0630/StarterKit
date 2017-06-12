/*eslint-disable no-console*/
import webpack from 'webpack';
import chalk from 'chalk';
import webpackConfig from '../webpack.config.prod'

process.env.NODE_ENV = 'production';
console.log(chalk.blue("Generating Minified Production Bundle"));


webpack(webpackConfig).run((err,stats)=>{
  if(err)
  {
    console.log(chalk.red(err));
    return 1;
  }
  else
  {
    const jsonStats = stats.toJson();
    if(jsonStats.hasErrors)
    {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }
    if(jsonStats.hasWarnings)
    {
        console.log(chalk.yellow("Webpack generated the following errors"));
        return jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log("Webpack stats: ${stats}");
    console.log(chalk.green("Your app has been built in production mode and written to /dist."));
    return 0;
  }
});
