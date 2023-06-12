const rootDir = require("./rootDir");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

module.exports = () => {
  const fiturs = [];

  // membaca folder fiturs
  fs.readdirSync(rootDir + "app/fiturs")
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    })
    .forEach((file) => {
      const fitur = file.replace(/\.js$/, ""); // menghilangkan ekstensi .js
      const [id, fiturName] = fitur.split("_");
      fiturs.push({ id, name: fiturName });
    });

  return fiturs;
  // end membaca folder fiturs
};
