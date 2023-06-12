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
    console.log(
      "ini adalah fitur tes, dan ini perintah command nya = " + command
    );

    await rkwpbot.sendMessage(from, {
      text: "hai ini dari sayaaaa " + sender + pushname,
    });
  } catch (e) {
    console.log(`ada error di fitur ${command} =  ${e}`);
  }
};
