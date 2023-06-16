const { default: axios } = require("axios");
const logging = require("../../lib/logging");
const { caption, warningIcon, prosesIcon, successIcon } = require("../config");
const sendMessageHelper = require("../../lib/sendMessage");
const reactMessageHelper = require("../../lib/reactMessage");
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

    if (q == "") {
      await sendMessage({
        text: "masukin dulu atuh link nya",
      });

      await reactMessage(warningIcon);
      return;
    }

    await reactMessage(prosesIcon);

    await sendMessage({
      text: "tunggu sebentar ya.. video kamu sedang proses",
    });

    const res = await axios({
      method: "get",
      url: `https://mfarels.my.id/api/tiktokv4?url=${q}`,
    });

    await sendMessage({
      video: {
        url: res.data.result.video,
      },
      mimetype: "video/mp4",
    });

    return await reactMessage(successIcon);
  } catch (e) {
    logging("error", "ERROR FITUR tt", e);
  }
};
