const logging = require("../../lib/logging");
const sendMessageHelper = require("../../lib/sendMessage");
const reactMessageHelper = require("../../lib/reactMessage");
const rootDir = require("../../lib/rootDir");
const writeFile = require("../../lib/writeFile");
const country = require("../../lib/phoneNumber/country");
const { failIcon } = require("../config");
module.exports = async ({
  rkwpbot,
  m,
  bot,
  type,
  body,
  budy,
  prefix,
  isCommand,
  command,
  isGroup,
  rkwp,
  pushname,
  q,
  args,
  content,
  sender,
  from,
  isMedia,
  isQuotedImage,
  isQuotedVideo,
  isQuotedSticker,
  isQuotedAudio,
  isLocationMessage,
}) => {
  try {
    const sendMessage = async (msg) => {
      return await sendMessageHelper({ rkwpbot, from, bot, msg });
    };
    const reactMessage = async (react) => {
      return await reactMessageHelper({ rkwpbot, from, bot, react });
    };

    //** Start Code */
    const negaraPengirim = country(from);

    console.log(">>> INI ADALAH STOP");
    const dataMenfess = require(rootDir + "database/menfess.json");
    // lakukan pencarian dulu apakah data nya beneran ada atau engga
    let ditemukan = false;
    for (let i = 0; i < dataMenfess.length; i++) {
      const menfess = dataMenfess[i];
      if (menfess.user1 === from || menfess.user2 === from) {
        dataMenfess.splice(i, 1);
        ditemukan = true;
      }
    }

    if (!ditemukan) {
      await reactMessage(failIcon);
      return await sendMessage({
        text:
          negaraPengirim === "ID"
            ? "perintah ini dapat digunakan ketika sedang dalam dialog menfess"
            : "command is invalid",
      });
    }
    writeFile({
      location: "database/menfess.json",
      contents: JSON.stringify(dataMenfess),
    });

    return await rkwpbot.sendMessage(from, {
      text:
        negaraPengirim === "ID"
          ? "berhasil keluar dari dialog"
          : "success leave from dialogs",
    });
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR stop", e);
  }
};
