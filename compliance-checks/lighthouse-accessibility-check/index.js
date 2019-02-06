const { scanURL, writeCheckFile, getCheckFileContent } = require("./lib");
require("dotenv-safe").config({ allowEmptyValues: true });

(async () => {
  try {
    const data = await scanURL();
    const categories = data.categories;
    writeCheckFile(process.env.OUT_PATH, getCheckFileContent(categories));
  } catch (e) {
    console.log(e.message);
  }
})();
