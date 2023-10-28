const text = "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭";
const textNormal = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const fontBaru = text.split("");
const fontNormal = textNormal.split("");

function convertFont(text) {
  text = text.toUpperCase();
  let fonts = {};
  for (let i = 0; i < fontNormal.length; i++) {
    fonts[fontNormal[i]] = fontBaru[i];
  }

  let result = "";
  text = text.split("");
  for (const t of text) {
    if (fonts[t] === undefined) {
      result += t;
    } else {
      result += fonts[t];
    }
  }

  return result;
}

console.log(convertFont("cek ch bokep"));
