const { promises: fs, constants: fsConstants } = require("fs");
const { join } = require("path");
const { readFile } = require("./readFile");
import { renameFile } from "../utils/renameFile";

import { note } from "../utils/note";

export const getFiles = async (path: string = process.env.CHECKS_PATH) => {
  try {
    await fs.access(path, fsConstants.R_OK);
  } catch ({ message }) {
    throw new Error(`Checks directory isn't a readable directory: ${message}`);
  }
  let files = await fs.readdir(path);

  if (!files) {
    note("☠ files not found");
  }

  let jsonFiles = files
    .filter(f => f.match(/.json$/) !== null)
    .map(f => join(path, f.match(/.json$/).input));

  note(`★ found ${jsonFiles.length} files`);

  let checks: string[] = await Promise.all(
    jsonFiles.map(async file => {
      return readFile(file);
    }),
  );

  return checks.map(c => {
    return JSON.parse(c);
  });
};
