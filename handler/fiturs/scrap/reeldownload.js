const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const reelsdownloaderio = async (link) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto("https://reelsdownloader.io/");
    await page.type("form>input.input-url", link, {
      delay: 20,
    });

    const searchLinkButton = await page.waitForSelector("form>button.get-btn");
    await searchLinkButton.click();

    const btnD = await page.waitForFunction(() => {
      return document.querySelector("div.dl-btn");
    });

    const btnDownload = await page.evaluate((btn) => btn.innerHTML, btnD);
    const $ = cheerio.load(btnDownload);
    const linkDownloadServer = $("a.dlbtn").attr("href");

    await page.close();
    await browser.close();

    return {
      link: {
        video: linkDownloadServer,
      },
      err: null,
    };
  } catch (err) {
    await browser.close();
    return {
      err,
    };
  }
};
module.exports = reelsdownloaderio;
