const logging = require('../../lib/logging');
const handleMessage = require('../../lib/handleMessage');
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
  const ev = handleMessage({ rkwpbot, from, bot });
  try {
    //** Start Code */
    await ev.sendMessageText('hello world');
    //** End Code */
  } catch (e) {
    logging('error', 'ERROR FITUR cf1 : ' + __dirname + __filename, e);
  }
};
