import chokidar from "chokidar";
import queue from "async/queue";
import { saveFile } from "../db/save";
import { readFile } from "../db/readFile";
import { Event } from "../interfaces/Event";
import { renameFile } from "../utils/renameFile";

const watchPath = process.env.CHECKS_PATH;

let counter: number = 0;

const globalQueue = queue(async (file, cb: () => {}) => {
  await saveFile(file);
  counter++;
  cb();
}, 1);

// Define our watching parameters
const listener = (event: Event, path: string) => {
  switch (event) {
    case "add":
      console.log("The file", path, "was created");
      saveWatchedFile(path);
      break;
  }
};

export const saveWatchedFile = async (path: string) => {
  // "checks/0-1542896172725.json"
  const file = await readFile(path);
  const data = JSON.parse(file);
  globalQueue.push(data, () => {
    console.log(`finished processing ${path} ${counter}`);
    // add .processed to the end of the filename
    renameFile(path);
  });
};

// looks for json files
// ignores everything but .json files
export const watchChecks = (): void => {
  chokidar
    .watch(`${watchPath}/*.json`, {
      ignored: /^(?!.*\.json$).*$/,
      ignoreInitial: true,
    })
    .on("all", listener);
};
