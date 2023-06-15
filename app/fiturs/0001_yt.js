const logging = require("../../lib/logging");
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
    const sendMessageWTyping = async (msg, jid) => {
      await rkwpbot.presenceSubscribe(jid);
      await delay(500);

      await rkwpbot.sendPresenceUpdate("composing", jid);
      await delay(1000);

      await rkwpbot.sendPresenceUpdate("paused", jid);

      await rkwpbot.sendMessage(jid, msg, {
        quoted: bot,
      });
    };

    await rkwpbot.sendMessage(from, {
      react: {
        key: bot.key,
        text: "🔄",
      },
    });

    await sendMessageWTyping(
      {
        text: "ini fitur tiktok yaa",
      },
      from
    );

    return await rkwpbot.sendMessage(from, {
      react: {
        key: bot.key,
        text: "✅",
      },
    });
  } catch (e) {
    logging("error", "ERROR FITUR yt", e);
  }
};
