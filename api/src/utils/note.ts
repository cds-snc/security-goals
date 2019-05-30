const chalk = require("chalk");
const log = console.log;

export const note = (message: string) => {
  log(chalk.black.bgGreen("\n\n" + message));
};

export const noteError = (message: string) => {
  log(chalk.black.bgYellow("\n\n" + message));
};
