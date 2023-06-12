const { join } = require("path");
const db = require("../app/api/database/models");
const allFiturs = require("./allFiturs");
const logging = require("./logging");
const parsePhoneNumber = require("libphonenumber-js");
const rootDir = require("./rootDir");
const config = require("../app/config");

const options = async (number) => {
  /*///////
   * {*} Prerelease {*}
   */ //*/
  try {
    const phoneNumber = await parsePhoneNumber(`+${number}`);
    if (!phoneNumber?.isValid()) {
      logging("error", "Gagal Mendaftarkan nomor", `${number} Tidak Valid\n`);
      process.exit();
    }
  } catch (err) {
    logging("error", "Connection", "Reybot Maintance");
  }
};

const open = async (rkwpbot) => {
  try {
    await rkwpbot.sendMessage(
      `${rkwpbot.user.id.split(":")[0]}@s.whatsapp.net`,
      {
        text: "Connected",
      }
    );
    logging("success", "Connected", rkwpbot.user.name);

    if (config.deleteDataFiturs) {
      db.Fitur.destroy({ where: {} }); // delete semua fitur

      const allFitur = allFiturs();

      const resultFitur = [];

      for (let i = 0; i < allFitur.length; i++) {
        const fitur = allFitur[i];
        await db.Fitur.create({
          id: fitur.id,
          name: fitur.name,
        });
        resultFitur.push({
          id: fitur.id,
          name: fitur.name,
        });
      }

      const fs = require("fs");

      fs.writeFile(
        join(rootDir, "database/fiturs.json"),
        JSON.stringify(resultFitur),
        function (err) {
          if (err) {
            return logging("error", "ERR SAVED fiturs.json", err);
          }
          logging("success", "Keterangan", "DATA FITUR DELETE AND REPLACES !");
        }
      );
    }
  } catch (err) {
    logging("error", "ADA ERRO DI " + __dirname + __filename, err);
  }
};

module.exports = { options, open };
