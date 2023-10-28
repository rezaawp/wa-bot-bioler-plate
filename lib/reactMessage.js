const logging = require("./logging");

module.exports = async ({ rkwpbot, from, bot, react }) => {
  try {
    await rkwpbot.sendMessage(from, {
      react: {
        key: bot.key,
        text: react,
      },
    });
  } catch (e) {
    logging("error", "ADA ERROR DI " + __dirname + __filename, e);
  }
};
