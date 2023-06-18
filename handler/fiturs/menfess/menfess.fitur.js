const logging = require("../../../lib/logging");

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
  delay,
  target,
}) => {
  try {
    console.log(">>> " + __dirname + __filename);
    return await rkwpbot.sendMessage(target, {
      text: body,
    });
  } catch (e) {
    logging("error", "ADA ERROR DI " + __dirname + __filename, e);
  }
};
