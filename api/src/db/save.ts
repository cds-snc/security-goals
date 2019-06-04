import queue from "async/queue";
import { File } from "../interfaces/File";
import { note } from "../utils/note";
import { renameFile } from "../utils/renameFile";

const { getFiles } = require("./getFiles");
const { checkExists, saveReleaseToDB } = require("./queries");
const merge = require("object-array-merge");
const { forceBoolean } = require("../utils/forceBoolean");

const getFileData = async () => {
  try {
    const data = await getFiles();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

/**
 * @param {array} arr - The array we care going to search
 * @param {string} index - The index in the array we want to match agaist
 * @param {string} val - The value we want to match agaist
 */
const contains = (arr, index, val) => {
  if (!arr) {
    return [];
  }

  const mapped = arr.reduce((accumulator, item) => {
    if (item[index] === val) {
      accumulator.push(item);
    }
    return accumulator;
  }, []);

  return mapped;
};

const checkVerificationExist = (verifications, newVerifications) => {
  return merge(verifications, newVerifications, "fileRef");
};

let verifications = {};

const checkControlExists = (fileControls, existingControls) => {
  verifications = {};
  let newControls = [];
  fileControls.forEach(item => {
    // check if the control exist in release
    const exists = contains(existingControls, "control", item.control);

    if (exists.length < 1) {
      // add new control to the release
      newControls.push(item);
    } else {
      exists.forEach(e => {
        const verfied = checkVerificationExist(
          e.verifications,
          item.verifications,
        );
        verifications[item.control] = verfied;
      });
    }
  });

  return newControls;
};

export const flattenAndSave = async (
  file: File = {},
  save: (file: File) => {} | void = () => {},
) => {
  if (!file || !file.satisfies) return;

  const obj = await mapToControlEntry(file);
  const result = await checkExists(obj);

  // check if there's an existing release
  if (!result.length) {
    // @ts-ignore
    return save(obj);
  }

  const existingControls = result[0].controls;
  const newControls = checkControlExists(obj.controls, existingControls);

  if (newControls.length >= 1) {
    // merge existing and new controls
    obj.controls = [...existingControls, ...newControls];
  } else {
    obj.controls = existingControls;
  }

  // update verifications

  obj.controls.map((item, index) => {
    if (verifications[item.control]) {
      obj.controls[index].verifications = verifications[item.control];
    }
  });

  // @ts-ignore
  return save(obj);
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const mapToControlEntry = async (file: File) => {
  let obj = {
    release: undefined,
    controls: [],
  };

  await asyncForEach(file.satisfies, async control => {
    // eslint-disable-next-line no-unused-vars
    const { satisfies, ...check } = file; // get obj without satisfies prop

    const cleanedCheck = { ...check, passed: forceBoolean(check.passed) };

    //let check = console.log(typeof check.passed)

    if (file && !file.release) {
      note(`☠ no release property set ${file.fileRef}`);
      return {};
    }

    obj.release = file.release;
    obj.controls.push({
      control,
      fileId: `${file.fileRef}--${control}`,
      verifications: [cleanedCheck],
    });
  });

  return obj;
};

export const saveFile = async file => {
  try {
    return await flattenAndSave(file, saveReleaseToDB);
  } catch (e) {
    console.log(e.message);
    // process.exit()
  }
};

//

const queueCB = async file => {
  await flattenAndSave(file, (obj: File) => {
    if (!obj || !obj.release) {
      return;
    }
    return saveReleaseToDB(obj);
  });
};

const q = queue(async (item: File, cb: (item: File) => {}) => {
  await queueCB(item);
  cb(item);
}, 1);

export const saveFiles = async () => {
  try {
    const files = await getFileData();
    const path = process.env.CHECKS_PATH;

    q.push(files, (item: File) => {
      console.log("finished processing file", item);
      // rename files
      try {
        renameFile(path + "/" + item.fileRef + ".json");
      } catch (err) {
        throw err;
      }
    });
  } catch (e) {
    console.log(e.message);
    // process.exit()
  }
};

module.exports = {
  flattenAndSave,
  mapToControlEntry,
  saveFile,
  saveFiles,
};
