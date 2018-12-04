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

const checkVerificationExist = (control, newVerifications) => {
  const verifications = control.verifications
  const fileRef = control.fileId.split('--')[0]
  console.log('===================')
  //console.log(newControls)
  console.log(newVerifications)
  console.log('===================')

  object - array - merge

  //console.log('control', control.control)

  // object-array-merge
  /*
  const exists = contains(verifications, 'fileRef', fileRef)
  if (exists < 1) {
    console.log('verification not found', exist)
  }

  return exists
  */
}

const checkControlExists = (fileControls, existingControls) => {
  let newControls = []
  fileControls.forEach(item => {
    // check if the control exist in release
    const exists = contains(existingControls, 'control', item.control)

    if (exists.length < 1) {
      // add new control to the release
      console.log('add new control')
      newControls.push(item)
    } else {
      checkVerificationExist(exists[0], item.verifications)
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

  if (newControls.length >= 1) {
    // merge existing and new controls
    obj.controls = [...existingControls, ...newControls]
    return save(obj)
  }
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
    process.exit()
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
    process.exit()
  }
}

module.exports = {
  flattenAndSave,
  mapToControlEntry,
  saveFile,
  saveFiles,
}
