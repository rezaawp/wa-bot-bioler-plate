const { default: axios } = require("axios");
const logging = require("../../lib/logging");
const { caption } = require("../config");
const { delay } = require("@whiskeysockets/baileys");
const sendMessage = require("../../lib/sendMessage");
const reactMessage = require("../../lib/reactMessage");
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
    await reactMessage({ rkwpbot, from, bot, react: "🔄" });

    const link1 =
      "https://mdcdn.xyz/dll?url=aHR0cHM6Ly92NzcudGlrdG9rY2RuLmNvbS8xMmRlNDdkY2M4OWVmODJkOGM3NDEyY2RmYmQ0OTYzNS82NDhiODY3Yi92aWRlby90b3MvdXNlYXN0MmEvdG9zLXVzZWFzdDJhLXB2ZS0wMDM3YzAwMS1haXNvLzBjZjY5YTQ3YmI3NjRmMTVhZDMwNDQ0MzNkMDMwYWY4Lz9hPTExODAmY2g9MCZjcj0wJmRyPTAmbHI9YWxsJmNkPTAlN0MwJTdDMCU3QzAmYnI9Nzc4JmJ0PTM4OSZjcz0wJmRzPTYmZnQ9cGZ1ckFNVDg4Ym1vMFBHSmJScGtWUTgtVk9UX0tKZC4mbWltZV90eXBlPXZpZGVvX21wNCZxcz0wJnJjPU16ZG5hVG96TXpNMVpqbzFPMlEyTkVCcE0yWTRhams2WmpkdE56TXpaamd6TTBBdEx5NDJZbDgyTmpZeE1TMWhZRFF2WVNOb0xXTmZjalJmWkRaZ0xTMWtMMk56Y3clM0QlM0QmbD0yMDIzMDYxNTE1NDQ1OEM3RDMxOTM1OEY0NzdEMTkxRDA3JmJ0YWc9ZTAwMDgwMDAwJmNjPTEz&name=bWF5X2RlbjI=&id=NzgzMzU4MjY=&type=mp4";
    const link2 =
      "https://v16m-default.akamaized.net/263344819b39418de14c17ed2e959e7e/648b87b4/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/0cf69a47bb764f15ad3044433d030af8/?a=0&ch=0&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&br=778&bt=389&cs=0&ds=6&ft=iJOG.y7oZZv0PD1I4ruXg9wPWQl-kEeC~&mime_type=video_mp4&qs=0&rc=MzdnaTozMzM1Zjo1O2Q2NEBpM2Y4ajk6ZjdtNzMzZjgzM0AtLy42Yl82NjYxMS1hYDQvYSNoLWNfcjRfZDZgLS1kL2Nzcw%3D%3D&l=2023061515501047A2103998713C19E4C4&btag=e00080000";

    console.log(">> LINK 2 = ", link2);
    await sendMessage({
      rkwpbot,
      msg: {
        video: {
          url: link2,
        },
        // mimetype: "video/mp4",
        // image: {
        //   url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/JPEG_example_flower.jpg",
        // },
      },
      bot,
      from,
    });

    return await reactMessage({ rkwpbot, from, bot, react: "✅" });
    if (q == "") {
      return await rkwpbot.sendMessage(from, {
        text: "masukan dulu atuh linknya. baru bisa aku proses",
      });
    }
    await rkwpbot.sendMessage(from, {
      text: "tunggu sebentar yaa, video kamu lagi proses",
    });

    const res = await axios({
      method: "get",
      url: `https://api.akuari.my.id/downloader/tiktok3?link=${q}`,
    });

    if (res.statusText === "OK") {
      await rkwpbot.sendMessage(from, {
        video: {
          url: res.data.hasil.download_mp4_hd,
        },
        caption,
      });
    } else {
      return await rkwpbot.sendMessage(
        from,
        "maaf ya, terjadi kesalahan di server yang membuat video tidak bisa di unduh"
      );
    }
  } catch (e) {
    logging("error", "ERROR FITUR tt", e);
  }
};
