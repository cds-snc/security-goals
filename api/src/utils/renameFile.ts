import * as fs from "fs";

export const renameFile = async (filePath: string) => {
  // assume file ends with .json
  let newFilePath = filePath + ".processed";
  fs.rename(filePath, newFilePath, function(err) {
    if(err) throw err;
  })
};

module.exports.renameFile = renameFile;