const logging = require("./logging");
const rootDir = require("./rootDir");

module.exports = () => {
  try {
    const fiturs = require(rootDir + "database/fiturs.json");
    console.log(">>> fiturs = ", fiturs);
  } catch (e) {
    logging("error", "ERROR DI FIND FITUR", e);
  }
};
