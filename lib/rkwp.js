const { tmpdir } = require("os");
const Crypto = require("crypto");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");

const pushContact = async (
  rkwpbot,
  msg,
  userId,
  message,
  delayPushCont,
  imgMessage
) => {
  const users = JSON.parse(
    readFileSync(join(__dirname, "../database/users.json"))
  );
  const contacts = JSON.parse(
    readFileSync(join(__dirname, "../database/contacts.json"))
  );
  const filteredUsers = [...new Set(users)];
  if (filteredUsers.length <= 0) {
    try {
      await rkwpbot.sendMessage(
        userId,
        {
          text: `*${config.authorName}* | Push Contact\n\n*Database Users ${filteredUsers.length}*\n\nSilahkan join kebeberapa *Group*, Untuk mendapatkan lebih banyak target push contact`,
        },
        { quoted: msg }
      );
    } catch (err) {
      logging("error", "Error sendMessage", err);
    }
  } else {
    try {
      await rkwpbot.sendMessage(
        userId,
        {
          text: `*${config.authorName}* | Push Contact\n\n*Push Contact start*\n*Target :* ${filteredUsers.length} users\n*Pesan :* ${message}\n*Delay :* ${delayPushCont} Milidetik`,
        },
        { quoted: msg }
      );
    } catch (err) {
      logging("error", "Error sendMessage", err);
    }
    let sent = 1;
    const loopPushContact = setInterval(async () => {
      if (!imgMessage) {
        if (0 === filteredUsers.length - 1) {
          try {
            await rkwpbot.sendMessage(userId, {
              text: `*${config.authorName}* | Push Contact\n\n*Push Contact Selesai*\n*Pesan Berhasil dikirim ke _${sent}_ users*`,
            });
            clearInterval(loopPushContact);
          } catch (err) {
            logging("error", "Error sendMessage", err);
          }
        } else {
          try {
            await rkwpbot.sendMessage(filteredUsers[0], {
              text: `${message}`,
            });
            logging("error", `Push Contact sent ${sent}`, filteredUsers[0]);
          } catch (err) {
            logging("error", `Push Contact Error ${sent}`, err);
          }
        }
      } else {
        if (0 === filteredUsers.length - 1) {
          try {
            await rkwpbot.sendMessage(userId, {
              text: `*${config.authorName}* | Push Contact\n\n*Push Contact Selesai*\n*Pesan Berhasil dikirim ke _${sent}_ users*`,
            });
            clearInterval(loopPushContact);
          } catch (err) {
            logging("error", "Error sendMessage", err);
          }
        } else {
          try {
            await rkwpbot.sendMessage(filteredUsers[0], {
              caption: message,
              image: imgMessage,
              headerType: 4,
            });
            logging("error", `Push Contact sent ${sent}`, filteredUsers[0]);
          } catch (err) {
            logging("error", `Push Contact Error ${sent}`, err);
          }
        }
      }
      filteredUsers.splice(0, 1);
      writeFileSync(
        join(__dirname, "../database/users.json"),
        JSON.stringify(filteredUsers)
      );
      sent++;
    }, delayPushCont);
  }
};

async function imageToWebp(media) {
  const tmpFileOut = join(
    tmpdir(),
    `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const tmpFileIn = join(
    tmpdir(),
    `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`
  );

  writeFileSync(tmpFileIn, media);

  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
      ])
      .toFormat("webp")
      .save(tmpFileOut);
  });

  const buff = readFileSync(tmpFileOut);
  unlinkSync(tmpFileOut);
  unlinkSync(tmpFileIn);
  return buff;
}

async function writeExifImg(media, metadata) {
  let wMedia = await imageToWebp(media);
  const tmpFileIn = join(
    tmpdir(),
    `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  const tmpFileOut = join(
    tmpdir(),
    `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`
  );
  writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    const img = new webp.Image();
    const json = {
      "sticker-pack-id": `https://github.com/DikaArdnt/Hisoka-Morou`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""],
    };
    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57,
      0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00,
    ]);
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
    const exif = Buffer.concat([exifAttr, jsonBuff]);
    exif.writeUIntLE(jsonBuff.length, 14, 4);
    await img.load(tmpFileIn);
    unlinkSync(tmpFileIn);
    img.exif = exif;
    await img.save(tmpFileOut);
    return tmpFileOut;
  }
}

module.exports = {
  pushContact,
  imageToWebp,
  writeExifImg,
};
