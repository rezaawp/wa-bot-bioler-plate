const { whatsapp } = require("../../../app/config");
const logging = require("../../../lib/logging");
const rootDir = require("../../../lib/rootDir");

module.exports = ({
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
  delay,
}) => {
  try {
    const menfessData = require(rootDir + "database/menfess.json");

    for (let i = 0; i < menfessData.length; i++) {
      const menfess = menfessData[i];
      if (menfess.user1 === from || menfess.user2 === from) {
        return {
          isTrue: true,
          target:
            menfess.user1 === from
              ? menfess.user2
              : menfess.user2 === from
              ? menfess.user1
              : from,
        };
      }
    }

    return {
      isTrue: false,
      target: null,
    };
  } catch (e) {
    logging("error", "ERROR DI " + __dirname + __filename, e);
  }
};
