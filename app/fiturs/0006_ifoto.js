const logging = require("../../lib/logging");
const handleMessage = require("../../lib/handleMessage");
const { default: axios } = require("axios");
const { prosesIcon } = require("../config");
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
    await ev.reactMessage(prosesIcon);

    const res = await axios({
      method: "get",
      url: "https://api.rezawp.com/api/ig/get-media-photo?link=" + q,
    });

    await ev.sendMessageImage({ url: res.data.result });
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR ifoto : " + __dirname + __filename, e);
  }
};
