const getCurrentsTime = require("./getCurrentsTime");
const rootDir = require("./rootDir");

module.exports = (type, info, message) => {
  const time = getCurrentsTime();
  switch (type) {
    case "primary":
      console.log(
        `\n\x1b[1m\x1b[44m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[34m${info}\x1b[0m :`,
        message
      );
      break;
    case "error":
      console.log(
        `\n\x1b[1m\x1b[41m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[31m${info}\x1b[0m :`,
        message
      );
      break;
    case "warning":
      console.log(
        `\n\x1b[1m\x1b[43m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[33m${info}\x1b[0m :`,
        message
      );
      break;
    case "success":
      console.log(
        `\n\x1b[1m\x1b[42m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[32m${info}\x1b[0m :`,
        message
      );
      console.log("root dir project = ", rootDir);
      break;
    case "info":
      console.log(
        `\n\x1b[1m\x1b[46m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[36m${info}\x1b[0m :`,
        message
      );
      break;

    default:
      console.log(
        `\n\x1b[1m\x1b[45m by : rezawp.com \x1b[0m\x20\x20${time}`,
        `\n\x1b[1m\x1b[35m${info}\x1b[0m :`,
        message
      );
      break;
  }
  return;
};
