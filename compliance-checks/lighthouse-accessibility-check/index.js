const { scanURL, writeCheckFile, getCheckFileContent } = require("./lib");
//require("dotenv-safe").config({ allowEmptyValues: true });

(async () => {
  try {
    const data = await scanURL();
    const categories = data.categories;
    const path = process.env.OUT_PATH ? process.env.OUT_PATH : "/checks/";
    writeCheckFile(path, getCheckFileContent(categories));
  } catch (e) {
    console.log(e.message);
  }
})();
