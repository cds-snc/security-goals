const renderPDF = async content => {
  const puppeteer = require("puppeteer");
  try {
    const browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage"
      ]
    });
    const page = await browser.newPage();

    await page.setContent(content);
    await page.emulateMedia("screen");

    /* https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions */

    const buffer = await page.pdf({
      format: "A4",
      printBackground: true
    });

    return buffer;
  } catch (e) {
    console.log(e);
  }
};

module.exports = renderPDF;
