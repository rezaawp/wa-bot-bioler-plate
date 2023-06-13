const { default: axios } = require("axios");
const logging = require("../../lib/logging");
const { caption } = require("../config");
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
    rkwpbot.sendMessage(from, {
      text: "Sedang mencari meme...",
    });

    const meme = await axios({
      method: "get",
      url: "https://api.akuari.my.id/other/meme",
    });

    return await rkwpbot.sendMessage(from, {
      image: { url: meme.data.image },
      caption: `${meme.data.title}

++++++++++++++++++++++++
${caption}`,
    });
    // after download completed close filestream

    // console.log({ res: res.data.hasil });
  } catch (e) {
    await rkwpbot.sendMessage(from, {
      text: "maaf ya, belum bisa menampilkan meme",
    });
    logging("error", "ERROR FITUR meme", e);
  }
};
