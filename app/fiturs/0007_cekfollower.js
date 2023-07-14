const logging = require("../../lib/logging");
const handleMessage = require("../../lib/handleMessage");
const { default: axios } = require("axios");
const { prosesIcon, failIcon } = require("../config");
const fs = require("fs");
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
    await ev.reactMessage(prosesIcon);

    const username = args[0];

    if (username === "rezaawp7") {
      await ev.reactMessage(failIcon);
      return await ev.sendMessageText("gaboleh kepo sama ig owner ah wkwk");
    }
    if (!q) {
      return await ev.sendMessageText(
        "fitur ini memungkinkan kamu untuk melihat akun yang tidak mem follback akun kamu.\n\nsyarat menggunakan fitur ini : akun TIDAK BOLEH PRIVATE\n\nperintah : \n.cekfollower *username* *followers* *followings*\n\nContoh : \n.cekfollower cristiano 100 100"
      );
    }

    const totalFollowers = parseInt(args[1]);
    const totalFollowings = parseInt(args[2]);
    console.log({ username, totalFollowers, totalFollowings });
    let total;

    if (totalFollowers === totalFollowings) {
      total = totalFollowers;
    } else if (totalFollowers > totalFollowings) {
      total = totalFollowers;
    } else if (totalFollowings > totalFollowers) {
      total = totalFollowings;
    }

    await ev.sendMessageText(
      "ini akan membutuhkan waktu yang lumayan lama. proses tergantung dari total followers atau total followings yang kamu masukan. jika proses sudah selesai, nanti aku kirim hasilnya disini"
    );

    const res = await axios({
      timeout: 86400,
      method: "GET",
      url: `https://api.rezawp.com/api/ig/check-not-follback?username=${username}&total=${total}&include_verified=y`,
    });

    let resultText = "LIST USERS NOT FOLLBACK YOUR ACCOUNT\n\n";

    for (const user of res.data.not_follback_users) {
      resultText += `Username : ${user.username}\n Fullname : ${user.full_name}\n------------------------------\n`;
    }

    fs.writeFileSync(`./database/acc_${username}.txt`, resultText);
    fs.writeFileSync(
      `./database/acc_${username}.json`,
      JSON.stringify(res.data.not_follback_users)
    );

    // require("./../../database/");

    await ev.sendMessageText(resultText);
    await ev.sendMessage({
      document: {
        url: `./database/acc_${username}.json`,
      },
      fileName: `HASIL JSON`,
      mimetype: "application/json",
    });

    await ev.sendMessage({
      document: {
        url: `./database/acc_${username}.txt`,
      },
      fileName: `HASIL TEXT`,
      mimetype: "text/plain",
    });

    //** End Code */
  } catch (e) {
    await ev.sendMessageText(JSON.stringify(e));
    logging("error", "ERROR FITUR cekfollower : " + __dirname + __filename, e);
  }
};
