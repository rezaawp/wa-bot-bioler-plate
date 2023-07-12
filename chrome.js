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
    await page.setCookie({
      name: "c_user",
      value: "100023965304731",
      domain: "www.facebook.com",
      expires: Date.now() / 1000 + 1800, // 30 menit yang akan datang
    });
    await page.setCookie({
      name: "xs",
      value:
        "25%3AhCuhKwDGFfjnuQ%3A2%3A1687771474%3A-1%3A11062%3A%3AAcWT_m-EonDp3ppiJ5pfuqfNaXRl-WwEVOpA9gqgFg",
      domain: "www.facebook.com",
      expires: Date.now() / 1000 + 1800, // 30 menit yang akan datang
    });

    await page.goto("https://www.facebook.com/friends/list");

    await page.setRequestInterception(true);
    page.on("request", async (request) => {
      console.log("MENCARI ... = ");
      if (
        request.method() === "POST" &&
        request.url().includes("https://www.facebook.com/api/graphql")
      )
        console.log("DITEMUKAN GRAPHQL NYA !");
      // console.log(">>> POST URL GRAPHQL= ", request.url());
    });

    page.on("response", async (response) => {
      const request = response.request();
      console.log(">> RESPONSE = ", await response.url());
      if (request.url().includes("https://www.facebook.com/api/graphql")) {
        const res = await response.json();
        console.log("RESPONSE GRAPHQL = ", res);
      }
    });

    // await page.waitForNetworkIdle();

    return console.log(">>> SELESAI");

    await page.type(
      "form>input#url",
      "https://youtube.com/shorts/-dglo50zgag?feature=share",
      {
        delay: 20,
      }
    );

    return;

    const buttonDownload = await page.waitForSelector(
      "span.input-group-btn>button#start"
    );
    await buttonDownload.click();

    // const tableResult = await page.waitForSelector("table.download-table");

    const tableResult = await page.waitForFunction(() => {
      return document.querySelector("table.download-table");
    });

    const tableResultHtml = await page.evaluate(
      (t) => t.innerHTML,
      tableResult
    );

    const $ = cheerio.load(tableResultHtml);

    const hasilLinknya = $("tr td a").html();

    console.log(hasilLinknya);

    return;
    // return page.close();
    // const modalFoter = await page.waitForSelector(
    const bodyHandle = await page.$("body");
    const btnD = await page.waitForFunction(() => {
      return document.querySelector("div.dl-btn");
    });
    const btnDownload = await page.evaluate((btn) => btn.innerHTML, btnD);
    // const $ = cheerio.load(btnDownload);
    const downloadBtn = $("a.dlbtn").attr("href");

    await page.waitForTimeout(7000);

    await page.close();
    await browser.close();
  } catch (err) {
    console.log(err);
    await browser.close();
  }
}
start();
