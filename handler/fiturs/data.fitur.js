const { Message } = require("../../app/api/database/models");
const { LogError } = require("../../app/api/helpers");

module.exports = ({
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
    // Message.create({
    //   user_id: from,
    // });
  } catch (e) {
    LogError(__dirname + __filename, e);
  }
};
