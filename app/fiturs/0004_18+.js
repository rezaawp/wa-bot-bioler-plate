const logging = require("../../lib/logging");
const handleMessage = require("../../lib/handleMessage");
const { default: axios } = require("axios");
const { prosesIcon } = require("../config");
const { successIcon } = require("../config");
const { failIcon } = require("../config");
const path = require("path");
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
    return ev.sendMessageText("hayo, gaboleh gitu");
    return await ev.sendMessage({
      video: {
        url: "http://porngif.cz/gif/ze%20zadu/0178.gif",
      },
      gifPlayback: true,
    });

    // const randomNum = Math.floor(Math.random() * 2) + 1;
    const randomNum = Math.round(Math.random());
    const endPoints = [
      "https://wibu-api.eu.org/api/porn/gif",
      "https://wibu-api.eu.org/api/porn/jav",
    ];

    const res = await axios({
      method: "get",
      url: endPoints[randomNum],
    });

    const url = res.data.url;
    const ekstensiUrl = path.extname(url);
    // if (ekstensiUrl === ".jpg" || ekstensiUrl === ".png") {
    //   await ev.sendMessageImage({ url });
    // }
    // if (ekstensiUrl === ".gif") {
    //   await ev.sendMessage({
    //     video: {
    //       url,
    //     },
    //     gifPlayback: true,
    //   });
    // }

    await ev.reactMessage(successIcon);
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR 18+", e);
    await ev.reactMessage(failIcon);
  }
};
