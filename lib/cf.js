const text = "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";
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
    if (fonts[t]) {
      result += fonts[t];
    }
  }

  return result;
}

module.exports = convertFont;
