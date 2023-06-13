const logging = require("../../lib/logging");
const config = require("../config");
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
    return await rkwpbot.sendMessage(from, {
      image: { url: `https://api.akuari.my.id/randomimage/darkjokes1` },
      caption: config.caption,
    });
  } catch (e) {
    logging("error", "ERROR FITUR darkjokes", e);
  }
};
