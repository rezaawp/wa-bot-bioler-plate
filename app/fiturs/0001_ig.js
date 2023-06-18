const logging = require("../../lib/logging");
const sendMessageHelper = require("../../lib/sendMessage");
const reactMessageHelper = require("../../lib/reactMessage");
const reelsdownloaderio = require("../../handler/fiturs/scrap/reeldownload");
const { prosesIcon, successIcon, failIcon } = require("../config");
const reactMessage = require("../../lib/reactMessage");

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
    if (q == "") {
      await sendMessage({
        text: "masukin dulu atuh link nya",
      });

      await reactMessage(warningIcon);
      return;
    }

    await reactMessage(prosesIcon);
    const downloader = await reelsdownloaderio(q);
    await sendMessage({
      video: {
        url: downloader.link.video,
      },
    });

    await reactMessage(successIcon);
    //** End Code */
  } catch (e) {
    await reactMessage(failIcon);
    logging("error", "ERROR FITUR ig", e);
  }
};
