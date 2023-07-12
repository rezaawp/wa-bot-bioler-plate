const logging = require("../../lib/logging");
const handleMessage = require("../../lib/handleMessage");
const { default: axios } = require("axios");
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
    const res = await axios({
      method: "get",
      url: "http://localhost:8000/api/ig/get-media-photo?link=" + q,
    });

    await ev.sendMessageVideo({ url: res.data.media_url });
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR ifoto : " + __dirname + __filename, e);
  }
};
