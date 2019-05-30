const { promises: fs } = require("fs");
const { basename } = require("path");

import { File } from "../interfaces/File";
import { noteError } from "../utils/note";

export const getFileName = (filepath: string) => {
<<<<<<< HEAD
  return basename(filepath, ".json");
};

export const readFile = async (file: string): Promise<string> => {
  const content = await fs.readFile(file, { encoding: "utf-8" });
  let obj: File = {};
=======
  return basename(filepath, '.json')
}

export const readFile = async (file: string): Promise<string> => {
  const content = await fs.readFile(file, { encoding: 'utf-8' })
  let obj: File = {}
>>>>>>> use chokidar

  try {
    obj = JSON.parse(content);
  } catch (e) {
    noteError(`☠ error parsing ${file}`);
  }

  // add filename to content for reference
  obj.fileRef = getFileName(file);
  return JSON.stringify(obj);
};

module.exports.readFile = readFile;
