const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const logging = require("../lib/logging");
const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const logger = require("pino");
const { join } = require("path");
const path = require("path");
const basename = path.basename(__filename);
const fs = require("fs");

const saveUsers = require("../lib/saveUsers");
const config = require("../app/config");
const rootDir = require("../lib/rootDir");
const allFiturs = require("../lib/allFiturs");

module.exports = async ({
  rkwpbot,
  msg,
  isGroup,
  connectReybotWhatsapp,
  m,
}) => {
  const bot = m.messages[0];
  try {
    const users = JSON.parse(
      readFileSync(join(__dirname, "../database/users.json"))
    );
    const contacts = JSON.parse(
      readFileSync(join(__dirname, "../database/contacts.json"))
    );

    if (isGroup) {
      /*///////
       * {*} Only fromMe {*}
       * //*/
      if (msg.key) {
        const userId = msg.key.participant;
        const fromMe = msg.key.fromMe;
        const pushName = msg.pushName;
        saveUsers({ userId, name: bot.pushName });
        const groupId = msg.key.remoteJid;
        let metadataGroup;
        let groupParticipants;
        try {
          metadataGroup = await rkwpbot.groupMetadata(groupId);
          groupParticipants = metadataGroup.participants.map((part) => part.id);
        } catch (err) {
          logging("error", "Error Get Metadata Group", err);
        }
        if (msg.message) {
          /*///////
           * {*} Messages Types Text / Conversation {*}
           * //*/
          const msgTxt = msg.message.extendedTextMessage
            ? msg.message.extendedTextMessage.text
            : msg.message.conversation;
          if (msg.message && msgTxt) {
            /*///////
             * {*} Start Me {*}
             */ //*/
            const meRegex = new RegExp(/^\.Me(nu)?\b/i);
            if (meRegex.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", `Get Message`, msgTxt);
              try {
                const templateMessage = {
                  image: {
                    url: join(__dirname, "../groupPict.jpeg"),
                  },
                  caption: config.menuMessage,
                  headerType: 4,
                  mentions: [config.authorNumber + "@s.whatsapp.net"],
                };
                await rkwpbot.sendMessage(groupId, templateMessage, {
                  quoted: msg,
                });
              } catch (err) {
                logging("error", "Error endMessage", err);
              }
            }
            /*///////
             * {*} End Me
             */ //*/
            /*//////
             * {*} Get Info Groups {*}
             * //*/
            const regexInfo = new RegExp(/^\.Info\b/i);
            if (regexInfo.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", `Get Message`, msgTxt);
              try {
                const templateText = `*${
                  config.authorName
                }* | Group info\n\n*Group Name :* ${
                  metadataGroup.subject
                }\n*Group ID :* ${
                  metadataGroup.id.split("@")[0]
                }\n*Group Owner :* +${
                  metadataGroup.owner.split("@")[0]
                }\n*Total Member Group :* ${groupParticipants.length}`;
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: templateText,
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { qouted: msg }
                );
              } catch (err) {
                logging("error", "Error get Info Group", err);
              }
            }
            /*//////
             * {*} End Get Info Groups {*}
             * //*/
            /*//////
             * {*} Start Push Contact Fitur Groups {*}
             */ //*/
            const regexPushCont = new RegExp(/^\.pushCont(act)?\s/i);
            if (regexPushCont.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              const parseMessage = msgTxt.replace(/^\.pushCont(act)?\s*/i, "");
              const messagePushCont = parseMessage.split("|")[0];
              const delayPushCont = parseInt(parseMessage.split("|")[1]);
              if (!messagePushCont) {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Format Tidak Valid\n\n*_Contoh_:* .pushCont Pesan Push Contact|3000`,
                      mentions: [config.authorNumber + `@s.whatsapp.net`],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", msgTxt);
                }
                return;
              } else if (isNaN(delayPushCont)) {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Dibelakang pesan tambahkan delay, Jeda berapa Milidetik setiap mengirim pesan & harus berformat angka\n\n*_Contoh_:* .pushCont ${messagePushCont}|3000`,
                      mentions: [config.authorNumber + `@s.whatsapp.net`],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", msgTxt);
                }
                return;
              } else {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Push Contact Start*\n*Target :* ${groupParticipants.length} users\n*Pesan :* ${messagePushCont}\n*Delay :* ${delayPushCont} Milidetik`,
                      mentions: [config.authorNumber + "@s.whatsapp.net"],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", err);
                }
                let sent = 0;
                const loopBroadcast = setInterval(async () => {
                  if (groupParticipants.length === sent) {
                    try {
                      await rkwpbot.sendMessage(
                        groupId,
                        {
                          text: `*${config.authorName}* | Push contact\n\n*Push Contact Selesai*\n*Pesan Berhasil dikirim ke _${sent}_ users*`,
                          mentions: [config.authorNumber + "@s.whatsapp.net"],
                        },
                        { quoted: msg }
                      );
                    } catch (err) {
                      logging("error", "Error Send Message", err);
                    }
                    logging(
                      "success",
                      `Push Contact Successfully`,
                      `Sent to ${sent} Users`
                    );
                    clearInterval(loopBroadcast);
                  } else {
                    try {
                      await rkwpbot.sendMessage(groupParticipants[sent], {
                        text: `${messagePushCont}`,
                      });
                    } catch (err) {
                      logging("error", "Error Push Contacts", err);
                    }
                    sent++;
                    logging(
                      "error",
                      `Push Contact sent ${sent}`,
                      groupParticipants[sent - 1]
                    );
                  }
                }, delayPushCont);
              }
            }
            /*//////
             * {*} End Push Contact Fitur Groups {*}
             * //*/
            /*//////
             * {*} Clone Group {*}
             */ //*/
            const cloneRegex = new RegExp(/^\.Clone\b\s/i);
            if (cloneRegex.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              try {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: `*ReybotVIP* | Cloning Group\n\n*Cloning Group Dan Semua Member Start*`,
                  },
                  { quoted: msg }
                );
                const nameGroup = msgTxt.replace(/^\.Clone\b\s*/i, "");
                const groupPict = readFileSync(
                  join(__dirname, "../groupPict.jpeg")
                );
                const group = await rkwpbot.groupCreate(
                  `${nameGroup}`,
                  groupParticipants
                );
                await rkwpbot.groupSettingUpdate(group.id, "locked");
                await rkwpbot.sendMessage(group.id, {
                  caption: `*Hallo Selamat datang semua di Group ${nameGroup}*`,
                  image: groupPict,
                  headerType: 4,
                });
                await rkwpbot.groupSettingUpdate(group.id, "announcement");
                logging("success", "Successfully Create Group", nameGroup);
              } catch (err) {
                logging("error", "Error Cloning group", err);
              }
            }
            /*///////
             * {*} End Clone Group {*}
             */ //*/
            /*//////
             * {*} Save All Members Group to Database Users {*}
             */ //*/
            const regexSaveUsers = new RegExp(/^\.Sa?ve?Us(er)?\b/i);
            if (regexSaveUsers.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              try {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: `*${config.authorName}* | Save Users\n\n*Save Users Start*\n*Total Member Group :* ${groupParticipants.length}`,
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
                const saveUsers = async () => {
                  for (let i = 0; i < groupParticipants.length; i++) {
                    users.push(groupParticipants[i]);
                  }
                };
                await saveUsers();
                writeFileSync(
                  join(__dirname, "../database/users.json"),
                  JSON.stringify(users)
                );
                logging(
                  "primary",
                  "Save Users Successfully",
                  groupParticipants
                );
              } catch (err) {
                logging("error", "Error Save User", err);
              } finally {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: `*${config.authorName}* | Save users\n\n*${groupParticipants.length} Nomor Member Dari Group Ini Telah Berhasil Disimpan Ke Database Users*`,
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
              }
            }
            /*///////
             * {*} End Save All Members Group to Database Users {*}
             */ //*/
            /*///////
             * {*} Save All Members Group to Database Contacts {*}
             */ //*/
            const saveContactsRegex = new RegExp(/^\.Sa?ve?Cont(act)?\b/i);
            if (saveContactsRegex.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              try {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: `*${config.authorName}* | Save Contacts\n\n*Save Contacts Start*\n*Total Member Group :* ${groupParticipants.length}`,
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
                const saveContact = async () => {
                  for (let i = 0; i < groupParticipants.length; i++) {
                    contacts.push(groupParticipants[i]);
                  }
                };
                await saveContact();
                writeFileSync(
                  join(__dirname, "../database/contacts.json"),
                  JSON.stringify(contacts)
                );
                logging(
                  "primary",
                  "Save Contacts Successfully",
                  groupParticipants
                );
              } catch (err) {
                logging("error", "Error Save Contacts", err);
              } finally {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: `*${config.authorName}* | Save Contacts\n\n*${groupParticipants.length} Nomor Member Dari Group Ini Telah Berhasil Disimpan Ke Database Contacts*`,
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
              }
            }
            /*//////
             * {*} End Save All Members Group to Database Contacts {*}
             */ //*/
            /*///////
             * {*} Exports All Contacts {*}
             */ //*/
            const exportContactRegex = new RegExp(/^\.exportCont(act)?\b/i);
            if (exportContactRegex.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              if (contacts.length === 0) {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Export Contact\n\n*Database Contact Masih Kosong*\n*Simpan Beberapa Nomor Terlebih Dahulu Jika Ingin Menggunakan Fitur Ini*`,
                      mentions: [config.authorNumber + "@s.whatsapp.net"],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", err);
                }
              } else {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: "*${config.authorName}* | Export Contact\n\n*Generate Contact*\n*Mohon tunggu Sebentar*",
                      mentions: [config.authorNumber + "@s.whatsapp.net"],
                    },
                    { quoted: msg }
                  );
                  const uniqueContacts = [...new Set(contacts)];
                  const vcardContent = uniqueContacts
                    .map((contact, index) => {
                      const vcard = [
                        "BEGIN:VCARD",
                        "VERSION:3.0",
                        `FN:WA[${index}] ${contact.split("@")[0]}`,
                        `TEL;type=CELL;type=VOICE;waid=${
                          contact.split("@")[0]
                        }:+${contact.split("@")[0]}`,
                        "END:VCARD",
                        "",
                      ].join("\n");
                      return vcard;
                    })
                    .join("");
                  writeFileSync(
                    join(__dirname, "../database/contacts.vcf"),
                    vcardContent,
                    "utf8"
                  );
                } catch (err) {
                  logging("error", "Error Send Message", err);
                } finally {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      document: readFileSync(
                        join(__dirname, "../database/contacts.vcf")
                      ),
                      fileName: "contacts.vcf",
                      caption: "Export Contact Success",
                      mimetype: "text/vcard",
                    },
                    { quoted: msg }
                  );
                  contacts.splice(0, contacts.length);
                  writeFileSync(
                    join(__dirname, "../database/contacts.json"),
                    JSON.stringify(contacts)
                  );
                }
              }
            }
            /*////////
             * {*} Ends Exports All Contacts {*}
             */ //*/
            /*///////
             * {*} Drop All Database Users {*}
             */ //*/
            const dropUser = new RegExp(/^\.dropUs(er)?\b/i);
            if (dropUser.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              try {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: "*${config.authorName}* | Drop Database Users\n\n*Baik _Tunggu Sebentart_*",
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
                users.splice(0, users.length);
                writeFileSync(
                  join(__dirname, "../database/users.json"),
                  JSON.stringify(users)
                );
              } catch (err) {
                logging("error", "Error Drop Database Users", err);
              } finally {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: "*${config.authorName}* | Drop Database Users\n\n*Done _Drop Database Users Berhasil_*",
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
              }
            }
            /*///////
             * {*} End Drop All Database Users {*}
             */ //*/
            /*///////
             * {*} Drop All Database Contacts {*}
             */ //*/
            const dropContact = new RegExp(/^\.dropCont(act)?\b/i);
            if (dropContact.test(msgTxt)) {
              if (!fromMe) return;
              logging("info", "Get Message", msgTxt);
              try {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: "*${config.authorName}* | Drop Database Contacts\n\n*Baik _Tunggu Sebentart_*",
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
                contacts.splice(0, contacts.length);
                writeFileSync(
                  join(__dirname, "../database/contacts.json"),
                  JSON.stringify(contacts)
                );
              } catch (err) {
                logging("error", "Error Drop Database Contacts", err);
              } finally {
                await rkwpbot.sendMessage(
                  groupId,
                  {
                    text: "*${config.authorName}* | Drop Database Contacts\n\n*Done _Drop Database Contacts Berhasil_*",
                    mentions: [config.authorNumber + "@s.whatsapp.net"],
                  },
                  { quoted: msg }
                );
              }
            }
            /*///////
             * {*} End Drop All Database Contacts {*}
             */ //*/
          }
          /*//////
           * {*} End Messages Types Text / Conversation {*}
           * //*/
          /*//////
           * {*} Messages Types Images {*}
           * //*/
          if (msg.message && msg.message.imageMessage) {
            const caption = msg.message.imageMessage.caption;
            /*//////
             * {*} Start Push Contact With Image Message
             * //*/
            const regexPushCont = new RegExp(/^\.pushCont(act)?\s/i);
            if (regexPushCont.test(caption)) {
              if (!fromMe) return;
              logging("info", "Get Message", caption);
              const parseMessage = caption.replace(/^\.pushCont(act)?\s*/i, "");
              const messagePushCont = parseMessage.split("|")[0];
              const delayPushCont = parseInt(parseMessage.split("|")[1]);
              if (!messagePushCont) {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Format Tidak Valid\n\n*_Contoh_:* .pushCont Pesan Push Contact|3000`,
                      mentions: [config.authorNumber + `@s.whatsapp.net`],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", msgTxt);
                }
                return;
              } else if (isNaN(delayPushCont)) {
                try {
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Dibelakang pesan tambahkan delay, Jeda berapa Milidetik setiap mengirim pesan & harus berformat angka\n\n*_Contoh_:* .pushCont ${messagePushCont}|3000`,
                      mentions: [config.authorNumber + `@s.whatsapp.net`],
                    },
                    { quoted: msg }
                  );
                } catch (err) {
                  logging("error", "Error Send Message", msgTxt);
                }
                return;
              } else {
                try {
                  const imgPushContact = await downloadMediaMessage(
                    msg,
                    "buffer",
                    {},
                    { logger }
                  );
                  await rkwpbot.sendMessage(
                    groupId,
                    {
                      text: `*${config.authorName}* | Push contact\n\n*Push Contact Start*\n*Total Member :* ${groupParticipants.length}\n*Pesan :* ${messagePushCont}\n*Delay :* ${delayPushCont} Milidetik`,
                      mentions: [config.authorNumber + "@s.whatsapp.net"],
                    },
                    { quoted: msg }
                  );
                  let sent = 0;
                  const loopBroadcast = setInterval(async () => {
                    if (groupParticipants.length === sent) {
                      await rkwpbot.sendMessage(
                        groupId,
                        {
                          text: `*${config.authorName}* | Push contact\n\n*Push Contact Selesai*\n*Pesan Berhasil dikirim ke _${sent}_ users*`,
                          mentions: [config.authorNumber + "@s.whatsapp.net"],
                        },
                        { quoted: msg }
                      );
                      logging(
                        "success",
                        `Push Contact Successfully`,
                        `Sent to ${sent} Users`
                      );
                      clearInterval(loopBroadcast);
                    } else {
                      await rkwpbot.sendMessage(groupParticipants[sent], {
                        caption: `${messagePushCont}`,
                        image: imgPushContact,
                        headerType: 4,
                      });
                      sent++;
                      logging(
                        "error",
                        `Push Contact sent ${sent}`,
                        groupParticipants[sent - 1]
                      );
                    }
                  }, delayPushCont);
                } catch (err) {
                  logging("error", "Failed to Push Contact", err);
                }
              }
            }
            /*///////
             * {*} End Push Contact With Images {*}
             */ //*/
            /*///////
             * {*} Create Sticker {*}
             */ //*/
            const stickerRegex = new RegExp(/^\.S(ticker)?\b/i);
            if (stickerRegex.test(caption)) {
              if (!fromMe) return;
              logging("info", "Get Message", caption);
              try {
                const img = await downloadMediaMessage(
                  msg,
                  "buffer",
                  {},
                  { logger }
                );
                const sticker = await writeExifImg(img, {
                  packname: "${config.authorName}",
                  author: `${pushName}`,
                });
                await rkwpbot.sendMessage(
                  groupId,
                  { sticker: { url: sticker } },
                  { quoted: msg }
                );
              } catch (err) {
                logging("error", "Error create sticker", err);
              }
            }
            /*///////
             * {*} End Sticker {*}
             */ //*/
          }
          /*//////
           * {*} End Message Types Image {*}
           * //*/
        }
      }
      return;
    } else {
      if (msg.key) {
        const userId = msg.key.remoteJid;
        saveUsers({ userId, name: bot.pushName });
        const pushName = msg.pushName;
        const fromMe = msg.key.fromMe;
        if (msg.message) {
          const msgTxt = msg.message.extendedTextMessage
            ? msg.message.extendedTextMessage.text
            : msg.message.conversation;

          // require("./me/fitur.me")({ rkwpbot, msg, msgTxt });
          // Start Properti
          const type = Object.keys(m.messages[0].message)[0];
          const body =
            type === "conversation"
              ? bot.message.conversation
              : type == "imageMessage"
              ? bot.message.imageMessage.caption
              : type == "videoMessage"
              ? bot.message.videoMessage.caption
              : type == "extendedTextMessage"
              ? bot.message.extendedTextMessage.text
              : type == "buttonsResponseMessage"
              ? bot.message.buttonsResponseMessage.selectedButtonId
              : type == "listResponseMessage"
              ? bot.message.listResponseMessage.singleSelectReply.selectedRowId
              : type == "templateButtonReplyMessage"
              ? bot.message.templateButtonReplyMessage.selectedId
              : type === "messageContextInfo"
              ? bot.message.buttonsResponseMessage?.selectedButtonId ||
                bot.message.listResponseMessage?.singleSelectReply
                  .selectedRowId ||
                bot.text
              : "";
          const budy =
            type === "conversation"
              ? bot.message.conversation
              : type === "extendedTextMessage"
              ? bot.message.extendedTextMessage.text
              : "";

          const prefix = /^[./~.#%^&=\,;:()z]/.test(body)
            ? body.match(/^[./~.#%^&=\,;:()z]/gi)
            : "#";
          const isCommand = body.startsWith(prefix);
          const command = isCommand
            ? body.slice(1).trim().split(/ +/).shift().toLowerCase()
            : null;

          const isGroup = bot.key.remoteJid.endsWith("@g.us");
          const from = bot.key.remoteJid;
          const sender = isGroup
            ? bot.key.participant
              ? bot.key.participant
              : bot.participant
            : bot.key.remoteJid;
          const content = JSON.stringify(bot.message);
          const args = body.trim().split(/ +/).slice(1);
          const q = args.join(" ");
          const pushname = bot.pushName;
          const rkwp = {
            key: {
              fromMe: false,
              participant: `${config.authorNumber}@s.whatsapp.net`,
              ...(from ? { remoteJid: "status@broadcast" } : {}),
            },
            message: { liveLocationMessage: { caption: config.authorName } },
          };

          // console.log({ type, bot });
          // console.log({ locationMessage: bot.message.locationMessage }); // menampilkan longitude lokasi
          const isMedia =
            type === "imageMessage" ||
            type === "videoMessage" ||
            type === "stickerMessage" ||
            type === "audioMessage";
          const isLocationMessage = type === "locationMessage";
          const isQuotedImage =
            type === "extendedTextMessage" && content.includes("imageMessage");
          const isQuotedVideo =
            type === "extendedTextMessage" && content.includes("videoMessage");
          const isQuotedSticker =
            type === "extendedTextMessage" &&
            content.includes("stickerMessage");
          const isQuotedAudio =
            type === "extendedTextMessage" && content.includes("audioMessage");
          const respon = (a, b) => {
            rkwpbot.sendMessage(
              from,
              { text: a, mentions: b },
              { quoted: rkwp }
            );
          };

          // async function shortUrl(url) {
          // return await (await fetch(`https://tinyurl.com/api-create.php?url=${url}`)).text()
          // }
          const isUserReplyLocationMessage = bot.message.extendedTextMessage
            ?.contextInfo?.quotedMessage?.locationMessage
            ? true
            : false;

          const dataMessage = {
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
          };
          // End Properti\

          if (!command)
            return logging(
              "error",
              "COMMAND",
              `Perintah ${body} tidak dapat ditemukan`
            );
          logging("primary", "COMMAND", command);

          const fiturs = allFiturs();

          // console.log(">>>! fiturs nihhh = ", fiturs);

          for (const fitur of fiturs) {
            if (fitur.name === command) {
              require(join(rootDir, `app/fiturs/${fitur.id}_${command}.js`))(
                dataMessage
              );
              dataMessage.fiturId = fitur.id;
              require("./fiturs/data.fitur")(dataMessage);
            }
          }
        }
      }
    }
    return;
  } catch (e) {
    return console.log("err di messages.js = ", e);
  }
};
