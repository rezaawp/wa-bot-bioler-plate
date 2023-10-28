//** Listen from : from.api*/

module.exports = async (rkwpbot, api) => {
  try {
    console.log("listen from api = ", api);
    // const prefix = /^[./~.#%^&=\,;:()z]/.test(body)
    //   ? body.match(/^[./~.#%^&=\,;:()z]/gi)
    //   : "#";
    // const isCommand = body.startsWith(prefix);
    // const command = isCommand;
    await rkwpbot.sendMessage(api.to + "@s.whatsapp.net", {
      text: api.message,
    });
  } catch (e) {
    return console.log("error from api/handler/listen.js = ", e);
  }
};
