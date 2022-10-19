import chalk from "chalk";
export default {
  success<T>(msg: T) {
    console.log(
      chalk.greenBright.bold.bgGreenBright("[✓]"),
      chalk.greenBright(msg)
    );
  },
  error<T>(msg: T) {
    console.log(chalk.red.bold.bgRedBright("[‼]"), chalk.red(msg));
  },
  warn<T>(msg: T) {
    console.log(
      chalk.hex("#fa0").bold.bgHex("#f90")("[/]"),
      chalk.hex("#fa0")(msg)
    );
  },
  info<T>(msg: T) {
    console.log(chalk.blue.bold.bgBlueBright("[?]"), chalk.blue(msg));
  },
};
