const logging = require("../../lib/logging");
const sendMessageHelper = require("../../lib/sendMessage");
const reactMessageHelper = require("../../lib/reactMessage");
const { findPhoneNumbersInText } = require("libphonenumber-js");
const nationalPhoneNumber = require("../../lib/phoneNumber/nationalPhoneNumber");
const { whatsapp, menuMessage } = require("../config");
const writeFile = require("../../lib/writeFile");
const rootDir = require("../../lib/rootDir");
const country = require("../../lib/phoneNumber/country");

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
    const sendMessage = async (msg, replaceFrom = null) => {
      return await sendMessageHelper({
        rkwpbot,
        from: replaceFrom ? replaceFrom : from,
        bot,
        msg,
      });
    };

    const reactMessage = async (react) => {
      return await reactMessageHelper({ rkwpbot, from, bot, react });
    };

    //** Start Code */
    const negaraPengirim = country(from);
    let noTarget;
    let message;
    const find = findPhoneNumbersInText(q);

    if (find.length > 0) {
      noTarget =
        find[0].number.countryCallingCode + find[0].number.nationalNumber;
      message = q.split(q.slice(find[0].startsAt, find[0].endsAt + 1))[1];
    } else {
      const nationalNumber = nationalPhoneNumber(args[0], negaraPengirim);
      noTarget = nationalNumber.err ? null : nationalNumber.phoneNumber;
      message = args.slice(1, args.length).join(" ");
    }

    if (!noTarget) {
      return sendMessage({
        text:
          negaraPengirim === "ID"
            ? "kamu menggunakan no telp Indonesia, pastikan memasukan no telpon indonesia dengar benar"
            : "invalid phone number. please check your phone number based on your country",
      });
    }

    if (!noTarget && !message) {
      return await sendMessage({
        text:
          negaraPengirim === "ID"
            ? "masukin dulu atuh no target sama messagenya"
            : "number and message is required",
      });
    }

    if (noTarget && !message) {
      return await sendMessage({
        text:
          negaraPengirim === "ID"
            ? "masukin dulu atuh message yang mau dikirimnya"
            : "message is required",
      });
    }

    const target = noTarget + whatsapp;

    const menfessData = require(rootDir + "database/menfess.json");

    menfessData.push({
      user1: from,
      user2: target,
    });

    writeFile({
      location: "database/menfess.json",
      contents: JSON.stringify([
        {
          user1: from,
          user2: target,
        },
      ]),
    });

    // mengirim pesan ke target
    await rkwpbot.sendMessage(target, {
      text: message,
    });

    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR menfess", e);
  }
};
