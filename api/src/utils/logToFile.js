const fs = require("fs");
const path = require("path");

const logToFile = (result, fileName = "log.json") => {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, fileName),
      JSON.stringify(result, null, 4),
    );
  } catch (err) {
    // An error occurred
    console.error(err);
  }
};

module.exports.logToFile = logToFile;
