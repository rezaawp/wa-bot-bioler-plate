const logging = require("../logging");
const rootDir = require("../rootDir");
const writeFile = require("../writeFile");

module.exports = function (file) {
  this.data = null;
  this.status = null;
  this.id = null;
  this.file = file;
  this.dataCollection = require(rootDir + file)[0];

  this.create = (data = { id: null, data: {} }) => {
    try {
      const dataLama = this.dataCollection;

      dataLama[data.id] = data.data;
      const resultData = [dataLama];

      writeFile({
        location: this.file,
        contents: JSON.stringify(resultData),
      });
      return true;
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
      return false;
    }
  };

  this.find = (id) => {
    try {
      const data = this.dataCollection;

      this.status = true;

      if (!data[id]) {
        this.status = false;
      } else {
        this.id = id;
        this.data = data[id];
      }

      return this;
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  this.update = (dataUpdate = {}, addRow = false) => {
    try {
      if (this.status) {
        for (const key in dataUpdate) {
          if (!addRow && this.dataCollection[this.id][key] === undefined)
            continue;

          this.dataCollection[this.id][key] = dataUpdate[key];
        }

        const resultData = [this.dataCollection];

        writeFile({
          location: this.file,
          contents: JSON.stringify(resultData),
        });
        return true;
      }
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }

    return false;
  };

  this.delete = () => {
    try {
      const data = this.dataCollection;
      let status;
      if (data[this.id]) {
        delete data[this.id];
        status = true;
        const result = [data];
        writeFile({ location: this.file, contents: JSON.stringify(result) });
      } else {
        status = false;
      }

      return status;
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  return this;
};
