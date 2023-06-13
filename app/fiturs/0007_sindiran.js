const { default: axios } = require("axios");
const logging = require("../../lib/logging");
const { authorNumber, caption } = require("../config");
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
    const result = await axios({
      method: "get",
      url: "https://api.akuari.my.id/randomtext/sindiran",
    });
    await rkwpbot.sendMessage(from, {
      text: result.data.hasil.result,
      mentions: [authorNumber + "@s.whatsapp.net"],
    });
    await rkwpbot.sendMessage(from, {
      text: caption,
    });
  } catch (e) {
    await rkwpbot.sendMessage(from, {
      text: "maaf yaa, saat ini belum bisa menampilkan sindirian",
    });
    logging("error", "ERROR FITUR sindirian", e);
  }
};
