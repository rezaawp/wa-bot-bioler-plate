const { join } = require("path");
const db = require("../app/api/database/models");
const allFiturs = require("./allFiturs");
const logging = require("./logging");
const parsePhoneNumber = require("libphonenumber-js");
const rootDir = require("./rootDir");
const config = require("../app/config");
const _ = require("lodash");
const fs = require("fs");

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
      const allFitur = allFiturs();
      const resultFitur = [];

      let fiturSebelumnya = await db.Fitur.findAll();

      if (fiturSebelumnya.length <= 0) {
        fs.writeFile(
          join(rootDir, "database/fiturs.json"),
          JSON.stringify(allFitur),
          function (err) {
            if (err) {
              return logging("error", "ERR SAVED fiturs.json", err);
            }
            logging("success", "Keterangan", "DATA FITUR SUCCESS ADD !");
          }
        );

        allFitur.map((f) => {
          return {
            id: f.id,
            name: f.name,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        });

        db.Fitur.bulkCreate(allFitur);
        return;
      }

      for (const f of fiturSebelumnya) {
        resultFitur.push({
          id: f.id,
          name: f.name,
        });
      }

      fiturSebelumnya = _.keyBy(fiturSebelumnya, "id"); // { '0001' : {....} }

      // bandignkan dulu fitur yang sebelumnya yang mana dan fitur yang baru ditambahin yang mana
      let startIndexMotong = 0;
      for (let i = 0; i < allFitur.length; i++) {
        const fitur = allFitur[i];
        if (!fiturSebelumnya[fitur.id]) {
          startIndexMotong = i;
          break;
        }
      }

      const fiturBaru = allFitur.slice(startIndexMotong);

      const cacheFiturs = require(rootDir + "database/fiturs.json");

      const fiturBaruResult = fiturBaru.map((f) => {
        return {
          id: f.id,
          name: f.name,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      const cacheUpdate = cacheFiturs.concat(
        fiturBaruResult.map((f) => {
          return {
            id: f.id,
            name: f.name,
          };
        })
      );

      if (fiturBaruResult.length !== allFitur.length) {
        logging("primary", "FITUR BARU", {
          fiturBaru: fiturBaruResult.length,
          allFitur: allFitur.length,
        });
        fs.writeFile(
          join(rootDir, "database/fiturs.json"),
          JSON.stringify(cacheUpdate),
          function (err) {
            if (err) {
              return logging("error", "ERR SAVED fiturs.json", err);
            }
            logging(
              "success",
              "FITUR BARU",
              "Berhasil menambahkan fitur baru!"
            );
          }
        );
        db.Fitur.bulkCreate(fiturBaruResult);
        logging(
          "success",
          ">>> FITUR BARU",
          fiturBaruResult.map((f) => f.name).join(", ")
        );
      }
    }
  } catch (err) {
    logging("error", "ADA ERRO DI " + __dirname + __filename, err);
  }
};

module.exports = { options, open };
