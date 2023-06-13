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
      url: `https://api.akuari.my.id/downloader/tiktok3?link=${q}`,
    });

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
