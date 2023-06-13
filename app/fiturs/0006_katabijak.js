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
      url: "https://api.akuari.my.id/randomtext/katabijak",
    });
    await rkwpbot.sendMessage(
      from,
      {
        text: result.data.hasil.quotes + "\n \n" + caption,
        mentions: [authorNumber + "@s.whatsapp.net"],
      },
      { quoted: rkwp }
    );
  } catch (e) {
    logging("error", "ERROR FITUR katabijak", e);
  }
};
