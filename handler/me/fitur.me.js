const config = require("../../app/config");
const logging = require("../../lib/logging");
const { pushContact, imageToWebp, writeExifImg } = require("../../lib/rkwp");
const { readFileSync, writeFileSync, unlinkSync } = require("fs");
const rootDir = require("../../lib/rootDir");
const saveUsers = require("../../lib/saveUsers");
const { join } = require("path");

module.exports = async ({ rkwpbot, msg, msgTxt, connectReybotWhatsapp }) => {
  /*///////
   * {*} Message Type Text {*}
   */ //*/

  const groupId = msg.key.remoteJid;
  let metadataGroup;
  let groupParticipants;
  try {
    metadataGroup = await rkwpbot.groupMetadata(groupId);
    groupParticipants = metadataGroup.participants.map((part) => part.id);
  } catch (err) {
    logging("error", "Error Get Metadata Group", err);
  }

  const users = JSON.parse(readFileSync(join(rootDir, "database/users.json")));
  const contacts = JSON.parse(
    readFileSync(join(rootDir, "database/contacts.json"))
  );

  const userId = msg.key.remoteJid;
  saveUsers({ userId });
  const pushName = msg.pushName;
  const fromMe = msg.key.fromMe;

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
            url: join(rootDir, "groupPict.jpeg"),
          },
          caption: config.menuMessage,
          headerType: 4,
          mentions: [config.authorNumber + "@s.whatsapp.net"],
        };
        await rkwpbot.sendMessage(userId, templateMessage, {
          quoted: msg,
        });
      } catch (err) {
        logging("error", "Error endMessage", err);
      }
    }
    /*///////
     * {*} End Me
     */ //*/
    /*/////

          * {*} Start Push Contact {*}
          */ //*/

    const regexInfo = new RegExp(/^\.Info\b/i);
    if (regexInfo.test(msgTxt)) {
      if (!fromMe) return;
      logging("info", `Get Message`, msgTxt);
      try {
        const templateText = `*ReybotVIP ヅ* | Group info\n\n*Group Name :* ${
          metadataGroup.subject
        }\n*Group ID :* ${metadataGroup.id.split("@")[0]}\n*Group Owner :* +${
          metadataGroup.owner.split("@")[0]
        }\n*Total Member Group :* ${groupParticipants.length}`;
        await reybot.sendMessage(
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

    const regexPushCont = new RegExp(/^\.pushCont(act)?\s/i);
    if (regexPushCont.test(msgTxt)) {
      if (!fromMe) return;
      logging("info", `Get Message`, msgTxt);
      const parseMessage = msgTxt.replace(/^\.pushCont(act)?\s*/i, "");
      const messagePushCont = parseMessage.split("|")[0];
      const delayPushCont = parseInt(parseMessage.split("|")[1]);
      if (!messagePushCont) {
        try {
          await rkwpbot.sendMessage(
            userId,
            {
              text: `*ReybotVIP ヅ* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Format Tidak Valid\n\n*_Contoh_:* .pushCont Pesan Push Contact|3000`,
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
            userId,
            {
              text: `*ReybotVIP ヅ* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Dibelakang pesan tambahkan delay, Jeda berapa Milidetik setiap mengirim pesan & harus berformat angka\n\n*_Contoh_:* .pushCont ${messagePushCont}|3000`,
            },
            { quoted: msg }
          );
        } catch (err) {
          logging("error", "Error Send Message", msgTxt);
        }
        return;
      } else {
        pushContact(rkwpbot, msg, userId, messagePushCont, delayPushCont);
      }
    }
    /*///////
     * {*} End Broadcast
     */ //*/
    /*//////
     * {*} Start Save Contacts {*}
     */ //*/
    const contactRegex = new RegExp(/^\.Sa?ve?\s/i);
    if (contactRegex.test(msgTxt)) {
      if (!fromMe) return;
      logging("info", `Get Message`, msgTxt);
      const contactName = msgTxt.replace(/^\.Sa?ve?\s*/i, "");
      try {
        await rkwpbot.sendMessage(
          userId,
          {
            sticker: {
              url: join(rootDir, "alzf1gcip.webp"),
            },
          },
          { quoted: msg }
        );
        contacts.push(userId);
        writeFileSync(
          join(rootDir, "database/contacts.json"),
          JSON.stringify(contacts)
        );
        const vcard =
          "BEGIN:VCARD\n" +
          "VERSION:3.0\n" +
          `FN:${contactName}\n` +
          `TEL;type=CELL;type=VOICE;waid=${userId.split("@")[0]}:+${
            userId.split("@")[0]
          }\n` +
          "END:VCARD";
        await rkwpbot.sendMessage(userId, {
          contacts: {
            displayName: `${contactName}`,
            contacts: [{ vcard }],
          },
        });
        await rkwpbot.sendMessage(userId, {
          text: `*ReybotVIP ヅ* | Save\n\n*DONE Nomormu Udah Gua Save*\n*Save Back _${pushName}_*`,
        });
      } catch (err) {
        logging("error", "Error sendMessage", err);
      }
    }
    /*///////
     * {*} End Save Contact {*}
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
            userId,
            {
              text: `*ReybotVIP ヅ* | Export Contact\n\n*Database Contact Masih Kosong*\n*Simpan Beberapa Nomor Terlebih Dahulu Jika Ingin Menggunakan Fitur Ini*`,
            },
            { quoted: msg }
          );
        } catch (err) {
          logging("error", "Error Send Message", err);
        }
      } else {
        try {
          const uniqueContacts = [...new Set(contacts)];
          await rkwpbot.sendMessage(
            userId,
            {
              text: "*ReybotVIP ヅ* | Export Contact\n\n*Generate Contact*\n*Mohon tunggu Sebentar*",
            },
            { quoted: msg }
          );
          const vcardContent = uniqueContacts
            .map((contact, index) => {
              const vcard = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `FN:WA[${index}] ${contact.split("@")[0]}`,
                `TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${
                  contact.split("@")[0]
                }`,
                "END:VCARD",
                "",
              ].join("\n");
              return vcard;
            })
            .join("");
          writeFileSync(
            join(rootDir, "database/contacts.vcf"),
            vcardContent,
            "utf8"
          );
        } catch (err) {
          logging("error", "Error Send Message", err);
        } finally {
          await rkwpbot.sendMessage(
            userId,
            {
              document: readFileSync(join(rootDir, "database/contacts.vcf")),
              fileName: "contacts.vcf",
              caption: "Export Contact Success",
              mimetype: "text/vcard",
            },
            { quoted: msg }
          );
          contacts.splice(0, contacts.length);
          writeFileSync(
            join(rootDir, "database/contacts.json"),
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
          userId,
          {
            text: "*ReybotVIP ヅ* | Drop Database Users\n\n*Baik _Tunggu Sebentart_*",
          },
          { quoted: msg }
        );
        users.splice(0, users.length);
        writeFileSync(
          join(rootDir, "database/users.json"),
          JSON.stringify(users)
        );
      } catch (err) {
        logging("error", "Error Drop Database Users", err);
      } finally {
        await rkwpbot.sendMessage(
          userId,
          {
            text: "*ReybotVIP ヅ* | Drop Database Users\n\n*Done _Drop Database Users Berhasil_*",
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
          userId,
          {
            text: "*ReybotVIP ヅ* | Drop Database Contacts\n\n*Baik _Tunggu Sebentart_*",
          },
          { quoted: msg }
        );
        contacts.splice(0, contacts.length);
        writeFileSync(
          join(rootDir, "database/contacts.json"),
          JSON.stringify(contacts)
        );
      } catch (err) {
        logging("error", "Error Drop Database Contacts", err);
      } finally {
        await rkwpbot.sendMessage(
          userId,
          {
            text: "*ReybotVIP ヅ* | Drop Database Contacts\n\n*Done _Drop Database Contacts Berhasil_*",
          },
          { quoted: msg }
        );
      }
    }
    /*///////
     * {*} End Drop All Database Contacts {*}
     */ //*/
    /*//////
     * {*} Start Chat Types Image {*}
     */ //*/
    const msgImg = msg.message.imageMessage;
    if (msg.message && msgImg) {
      const caption = msg.message.imageMessage.caption;
      /*////////
       * {*} Push Contact With Images {*}
       */ //*/
      const regexPushCont = new RegExp(/^\.pushCont(act)?\s/i);
      if (regexPushCont.test(caption)) {
        if (!fromMe) return;
        logging("info", "Get Messages", caption);
        const parseCaption = caption.replace(/^\.pushCont(act)?\s*/i, "");
        const captionPushCont = parseCaption.split("|")[0];
        const delayPushCont = parseInt(parseCaption.split("|")[1]);
        if (!captionPushCont) {
          try {
            await rkwpbot.sendMessage(
              userId,
              {
                text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Format Tidak Valid\n\n*_Contoh_:* .pushCont Pesan Push Contact|3000`,
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
              userId,
              {
                text: `*${config.authorName}* | Push contact\n\n*Format Perintah Yang Anda Berikan Tidak Valid*\n*Error :* Dibelakang pesan tambahkan delay, Jeda berapa Milidetik setiap mengirim pesan & harus berformat angka\n\n*_Contoh_:* .pushCont ${captionPushCont}|3000`,
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
            pushContact(
              rkwpbot,
              msg,
              userId,
              captionPushCont,
              delayPushCont,
              imgPushContact
            );
          } catch (err) {
            logging("info", "Error Push Contact", err);
          }
        }
      }
      /*///////
       * {*} End Broadcast With Images {*}
       */ //*/
      /*///////
       * {*} Create Sticker {*}
       */ //*/
      const stickerRegex = new RegExp(/^\.S(ticker)?\b/i);
      if (stickerRegex.test(caption)) {
        if (!fromMe) return;
        logging("info", "Get Messages", caption);
        try {
          const img = await downloadMediaMessage(msg, "buffer", {}, { logger });
          const sticker = await writeExifImg(img, {
            packname: "${config.authorName}",
            author: `${pushName}`,
          });
          await rkwpbot.sendMessage(
            userId,
            { sticker: { url: sticker } },
            { quoted: msg }
          );
        } catch (err) {
          logging("error", "Can't Create Sticker", err);
        }
      }
      /*//////
       * {*} End Create Sticker {*}
       */ //*/
    }
    /*////////
     * {*} End Message Types Image {*}
     */ //*/
  }
  /*//////
   * {*} End Message Types Text / Conversation {*}
   */ //*/
};
