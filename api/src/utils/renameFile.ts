const fs = require("fs");

export const renameFile = async (filePath: string) => {
  // assume file ends with .json
  let newFilePath = filePath.slice(0, -5) + ".processed";
  fs.rename(filePath, newFilePath, (err) => {
    if(err) throw err;
  })
};

module.exports.renameFile = renameFile;