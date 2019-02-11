const { scanURL, writeCheckFile, checkFileContent } = require("./lib");

(async () => {
  try {
    /*
    // for testing
    const data = {
      categories: {
        pwa: {
          score: 0.3
        },
        speed: {
          score: 0.5
        }
      }
    };
    */

    const data = await scanURL();

    if (!data || !data.categories) {
      throw new Error("Unable to retreive lighthouse data");
    }

    const categories = data.categories;
    const path = process.env.OUT_PATH ? process.env.OUT_PATH : "/checks/";
    writeCheckFile(path, checkFileContent(categories));
  } catch (e) {
    console.log(e.message);
  }
})();
