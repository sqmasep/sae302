import chalk from "chalk";
const log = {
  success: (msg: any) =>
    console.log(
      chalk.greenBright.bold.bgGreenBright("[✓]"),
      chalk.greenBright(msg)
    ),
  error: (msg: any) =>
    console.error(chalk.red.bold.bgRedBright("[‼]"), chalk.red(msg)),

  warn: (msg: any) =>
    console.warn(
      chalk.hex("#fa0").bold.bgHex("#f90")("[/]"),
      chalk.hex("#fa0")(msg)
    ),

  info: (msg: any) =>
    console.info(chalk.blue.bold.bgBlueBright("[?]"), chalk.blue(msg)),

  danger: (msg: any): string => chalk.red(msg),
};

export default log;
