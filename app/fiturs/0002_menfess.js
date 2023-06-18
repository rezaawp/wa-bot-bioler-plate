const logging = require("../../lib/logging");
const sendMessageHelper = require("../../lib/sendMessage");
const reactMessageHelper = require("../../lib/reactMessage");
const { findPhoneNumbersInText } = require("libphonenumber-js");
const nationalPhoneNumber = require("../../lib/phoneNumber/nationalPhoneNumber");

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
    const negaraPengirim = findPhoneNumbersInText("+" + from)[0].number.country;
    let noTarget;
    let message;
    const find = findPhoneNumbersInText(q);

    if (find.length > 0) {
      noTarget = find[0].number.number;
      message = q.split(q.slice(find[0].startsAt, find[0].endsAt + 1));
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

    require("./../../handler/fiturs/menfess/menfess.fitur")(rkwpbot, {
      noTarget,
      message,
    });

    await sendMessage({
      text: "hello world",
    });
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR menfess", e);
  }
};
