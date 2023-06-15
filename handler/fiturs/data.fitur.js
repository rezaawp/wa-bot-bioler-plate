const { Message } = require("../../app/api/database/models");
const { LogError } = require("../../app/api/helpers");

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
  fiturId,
}) => {
  try {
    const data = {
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
      fiturId,
    };
    await Message.create({
      message: JSON.stringify(data),
      user_id: from,
      fitur_id: fiturId,
      date: new Date(),
    });
  } catch (e) {
    LogError(__dirname + __filename, e);
  }
};
