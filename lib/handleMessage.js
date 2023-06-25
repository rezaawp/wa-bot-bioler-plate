const sendMessageHelper = require("./sendMessage");
const reactMessageHelper = require("./reactMessage");
const logging = require("./logging");

module.exports = ({ rkwpbot, from, bot }) => {
  const sendMessage = async (msg) => {
    try {
      return await sendMessageHelper({ rkwpbot, from, bot, msg });
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  const sendMessageText = async (msgText) => {
    try {
      return await sendMessage({
        text: msgText,
      });
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  const reactMessage = async (react) => {
    try {
      return await reactMessageHelper({ rkwpbot, from, bot, react });
    } catch (e) {
      logging("error", "ADA ERRO DI " + __dirname + __filename, e);
    }
  };

  const sendMessageVideo = async ({ url = null, stream = null }) => {
    try {
      if (url && stream) return console.log("pilih salah satu metode saja");
      const vidObj = url ? { url } : { stream };
      return await sendMessage({
        video: vidObj,
      });
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  const sendMessageImage = async ({ url = null, stream = null }) => {
    try {
      if (url && stream) return console.log("pilih salah satu metode saja");
      const imgObj = url ? { url } : { stream };
      return await sendMessage({
        image: imgObj,
      });
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  const sendMessageDocument = async ({ url = null, stream = null }) => {
    try {
      if (url && stream) return console.log("pilih salah satu metode saja");
      const docObj = url ? { url } : { stream };
      return await sendMessage({
        document: docObj,
      });
    } catch (e) {
      logging("error", "ADA ERROR DI " + __dirname + __filename, e);
    }
  };

  return {
    sendMessageImage,
    sendMessageText,
    sendMessage,
    reactMessage,
    sendMessageVideo,
    sendMessageDocument,
  };
};
