const fs = require("fs");
const rootDir = require("./rootDir");
const logging = require("./logging");
const { join } = require("path");

const writeFile = ({ location, contents }) => {
  return fs.writeFile(join(rootDir, location), contents, function (err) {
    if (err) {
      return logging("error", "ERR SAVED " + location, err);
    }
  });
};

module.exports = writeFile;
