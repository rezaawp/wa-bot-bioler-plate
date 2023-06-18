const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const context = browser.defaultBrowserContext();
  try {
    const page = await browser.newPage();
    await page.goto("https://reelsdownloader.io/");
    // await page.type("input[name=userinsta]", "rezaawp7", { delay: 20 });
    // const form = await page.$("#button-submit");
    // await form.evaluate((form) => form.click());
    // let link;
    // await page.setRequestInterception(true);
    // page.on("request", async (interceptedRequest) => {
    //   if (
    //     interceptedRequest
    //       .url()
    //       .includes("https://api6.reelsdownloader.io/allinone")
    //   ) {
    //     link = interceptedRequest.url();
    //     console.log("YOI = ", await interceptedRequest.response().url());
    //     // interceptedRequest.response().then((response) => {
    //     //   console.log("Response URL:", response.url());
    //     //   console.log("Response Status:", response.status());
    //     //   console.log("Response Headers:", response.headers());
    //     //   response.text().then((text) => {
    //     //     console.log("Response Body:", text);
    //     //   });
    //     // });
    //     // console.log(">>> YES DAPET !!", await interceptedRequest.response());
    //     // interceptedRequest.abort();
    //   } else {
    //     interceptedRequest.continue();
    //   }
    // });

    console.log("sebelum 2 detik");
    // await page.waitForTimeout(2000);
    console.log("sesudah 2 detik");
    // const status = await page.$("#form-alert");

    await page.type(
      "form>input.input-url",
      "https://www.instagram.com/reel/Ctbd8vCOQ2v/?igshid=MzRlODBiNWFlZA==",
      {
        delay: 20,
      }
    );

    const buttonDownload = await page.waitForSelector("form>button.get-btn");
    await buttonDownload.click();

    // const modalFoter = await page.waitForSelector(
    //   ".modal-footer>button#close-modal"
    // );

    // await modalFoter.click();
    // const download720 = await page.waitForSelector("a#download-mp4-720-audio");
    // await download720.click();
    // await page.waitForTimeout(3000);
    const downloadSrc = await page.$(".dlbtn");

    // console.log("ELEMENT NIH = ", await downloadSrc.toElement("a"));
    const bodyHandle = await page.$("body");
    const btnD = await page.waitForFunction(() => {
      return document.querySelector("div.dl-btn");
    });
    // await downloadSrc = bodyHandle.$x('')
    const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    const btnDownload = await page.evaluate((btn) => btn.innerHTML, btnD);
    const $ = cheerio.load(btnDownload);
    const downloadBtn = $("a.dlbtn").attr("href");
    console.log("BUTTON DOWNLOAD = ", downloadBtn);
    // let $ = cheerio.load(html);

    // const atr = $(".dlbtn");
    // console.log(html);
    // const download = await page.waitForSelector(".download-bottom>a");
    // console.log("DOWNLAOD = ", atr.html());
    await page.waitForTimeout(7000);

    // const bodyHandle = await page.$("body");
    // console.log("BODY HANDLE = ", bodyHandle);
    // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);
    // console.log(html);
    await page.close();
    await browser.close();
    // console.log("BROWSER SUDAH DI TUTUP YA DAN HASILNYA = ", link);
    // let $ = cheerio.load(html),
    //   obj = {};
    // obj.avatar = $(
    //   "body > main > div.profile > div > div > div > div.profile-info > img"
    // ).attr("src");
    // // obj.username = $('div.username > h2').text()
    // obj.fullname = $("#username").text();
    // obj.description = $("#user-bio").text().trim();
    // obj.followers = $("#follower_count").text();
    // obj.following = $("#following_count").text();
    // obj.totalpost = $("#post_count").text();
    // obj.status = $("#form-alert").text() || 200;
    // if (
    //   obj.status ===
    //   "The username you just entered is incorrect or this user has been deleted"
    // ) {
    //   console.log("ada error");
    //   await browser.close();
    // } else {
    //   console.log(obj);
    //   await browser.close();
    // }
  } catch (err) {
    console.log(err);
    await browser.close();
  }
}
start();
