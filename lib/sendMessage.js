const { delay } = require("@whiskeysockets/baileys");
const logging = require("./logging");

module.exports = async ({ rkwpbot, msg, from, bot }) => {
  try {
    await rkwpbot.presenceSubscribe(from);
    await delay(500);

    await rkwpbot.sendPresenceUpdate("composing", from);
    await delay(1000);

    await rkwpbot.sendPresenceUpdate("paused", from);

    await rkwpbot.sendMessage(from, msg, {
      quoted: bot,
    });
  } catch (e) {
    logging("error", "ADA ERROR DI " + __dirname + __filename, e);
  }
};
