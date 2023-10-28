const logging = require("../../lib/logging");
const handleMessage = require("../../lib/handleMessage");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
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
    // await ev.sendMessageText("hello world");

    const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
    const ffmpeg = require("fluent-ffmpeg");
    ffmpeg.setFfmpegPath(ffmpegPath);

    const fs = require("fs");

    if (isMedia || isQuotedImage) {
      var stream = await downloadContentFromMessage(
        bot.message.imageMessage ||
          bot.message.extendedTextMessage?.contextInfo.quotedMessage
            .imageMessage,
        "image"
      );
      var buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }

      console.log(">> image = ", buffer);
      fs.writeFileSync("./media/res_buffer.jpg", buffer);
      const image = "./media/res_buffer.jpg";
      await ffmpeg(image)
        .input(image)
        .on("error", function (error) {
          console.log(error);
        })
        .on("end", function () {
          rkwpbot.sendMessage(from, {
            sticker: { url: "./media/mysticker.webp" },
            mimetype: "image/webp",
          });
        })
        .addOutputOptions([
          `-vcodec`,
          `libwebp`,
          `-vf`,
          `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
        ])
        .toFormat("webp")
        .save("./media/mysticker.webp");
    } else if (isMedia || isQuotedVideo) {
      var stream = await downloadContentFromMessage(
        bot.message.videoMessage ||
          bot.message.extendedTextMessage?.contextInfo.quotedMessage
            .videoMessage,
        "video"
      );
      var buffer = Buffer.from([]);
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
      }
      fs.writeFileSync("./media/res_buffer.mp4", buffer);
      const video = "./media/res_buffer.mp4";
      await ffmpeg(video)
        .input(video)
        .on("error", function (error) {
          console.log("error", error);
        })
        .on("end", function () {
          rkwpbot.sendMessage(from, {
            sticker: { url: "./media/mysticker2.webp" },
            mimetype: "image/webp",
          });
        })
        .addOutputOptions([
          "-vcodec",
          "libwebp",
          "-vf",
          "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        ])
        .toFormat("webp")
        .save("./media/mysticker2.webp");
    } else {
      console.log(">>> MEDIA TIDAK DAPAT DITEMUKAN");
      await rkwpbot.sendMessage(
        from,
        {
          text: "Kirim media image/video, Lalu reply dan gunakan command .sticker",
        },
        { quoted: bot }
      );
    }
    //** End Code */
  } catch (e) {
    logging("error", "ERROR FITUR sticker : " + __dirname + __filename, e);
  }
};
