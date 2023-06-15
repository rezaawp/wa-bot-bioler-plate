const { default: axios } = require("axios");
const logging = require("../../lib/logging");
const { caption } = require("../config");
const sendMessage = require("../../lib/sendMessage");
const reactMessage = require("../../lib/reactMessage");
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
    await reactMessage({ rkwpbot, from, bot, react: "🔄" });

    if (q == "") {
      return await rkwpbot.sendMessage(from, {
        text: "masukan dulu atuh linknya. baru bisa aku proses",
      });
    }
    await rkwpbot.sendMessage(from, {
      text: "tunggu sebentar yaa, video kamu lagi proses",
    });

    const res = await axios({
      method: "get",
      url: `https://mfarels.my.id/api/tiktokv4?url=${q}`,
    });

    console.log(">>> LINK VIDE0 = ", "PENDING");
    console.log(">>> LINK VIDE0 = ", res.data.result.video);

    await sendMessage({
      rkwpbot,
      msg: {
        video: {
          url: res.data.result.video,
        },
        mimetype: "video/mp4",
      },
      bot,
      from,
    });

    return await reactMessage({ rkwpbot, from, bot, react: "✅" });
    if (res.statusText === "OK") {
      await rkwpbot.sendMessage(from, {
        video: {
          url: res.data.hasil.download_mp4_hd,
        },
        caption,
      });
    } else {
      return await rkwpbot.sendMessage(
        from,
        "maaf ya, terjadi kesalahan di server yang membuat video tidak bisa di unduh"
      );
    }
  } catch (e) {
    logging("error", "ERROR FITUR tt", e);
  }
};
