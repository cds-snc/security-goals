const { getFiles } = require('./getFiles')
const { checkExists, saveReleaseToDB } = require('./queries')
const filenamify = require('filenamify')
const { q } = require('./queue')
const merge = require('object-array-merge')

const getFileData = async () => {
  try {
    const data = await getFiles()
    return data
  } catch (e) {
    console.log(e.message)
  }
}

const contains = (arr, index, val) => {
  if (!arr) {
    return []
  }

  const mapped = arr.reduce((accumulator, item) => {
    if (item[index] === val) {
      accumulator.push(item)
    }
    return accumulator
  }, [])

  return mapped
}

const checkVerificationExist = (verifications, newVerifications) => {
  return merge(verifications, newVerifications, 'origin')
}

let verifications = {}

const checkControlExists = (fileControls, existingControls) => {
  verifications = {}
  let newControls = []
  fileControls.forEach(item => {
    // check if the control exist in release
    const exists = contains(existingControls, 'control', item.control)
    if (exists.length < 1) {
      // add new control to the release
      console.log('add new control')
      newControls.push(item)
    } else {
      const verfied = checkVerificationExist(
        exists[0].verifications,
        item.verifications,
      )
      verifications[item.control] = verfied
    }
  })

  return newControls
}

const flattenAndSave = async (file = false, save = () => {}) => {
  if (!file || !file.satisfies) return

  const obj = await mapToControlEntry(file)
  const result = await checkExists(obj)

  // check if there's an existing release
  if (!result.length) {
    console.log('new release')
    return save(obj)
  }

  const existingControls = result[0].controls
  const newControls = checkControlExists(obj.controls, existingControls)
  //console.log('=================')
  //console.log(verifications)

  if (newControls.length >= 1) {
    // merge existing and new controls
    obj.controls = [...existingControls, ...newControls]
  }

  // update verifications
  obj.controls.map((item, index) => {
    if (verifications[item.control]) {
      obj.controls[index].verifications = verifications[item.control]
    }
  })

  return save(obj)
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const mapToControlEntry = async file => {
  let obj = {
    release: undefined,
    controls: [],
  }

  await asyncForEach(file.satisfies, async control => {
    const id = filenamify(control)
    const { satisfies, ...check } = file // get obj without satisfies prop
    obj.release = file.release
    obj.controls.push({
      control,
      fileId: `${file.fileRef}--${control}`,
      verifications: [check],
    })
  })

  return obj
}

const saveFile = async file => {
  try {
    await flattenAndSave(file, saveReleaseToDB)
  } catch (e) {
    console.log(e.message)
    //process.exit()
  }
}

const saveFiles = async () => {
  try {
    const files = await getFileData()
    const cb = async file => {
      const obj = await flattenAndSave(file, async obj => {
        return await saveReleaseToDB(obj)
      })
      q.doAction(cb)
    }

    q.setItems(files)
    q.doAction(cb)
  } catch (e) {
    console.log(e.message)
    //process.exit()
  }
}

module.exports = {
  flattenAndSave,
  mapToControlEntry,
  saveFile,
  saveFiles,
}
