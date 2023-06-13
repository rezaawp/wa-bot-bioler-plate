const logging = require("../../lib/logging");
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
      text: "hai",
    });
  } catch (e) {
    logging("error", "ERROR FITUR tt", e);
  }
};
