const { check } = require('./model')
const { getChecks } = require('./getChecks')

const getFileData = async () => {
  try {
    const data = await getChecks()
    return data
  } catch (e) {
    console.log(e.message)
  }
}

const flattenAndSave = (file = false) => {
  if (!file || !file.satisfies) return

  file.satisfies.forEach(control => {
    let obj = { ...file, control, fileId: `${file.fileRef}--${control}` }
    saveToDB(obj, check)
  })
}

const saveFile = async file => {
  try {
    flattenAndSave(file)
  } catch (e) {
    console.log(e.message)
    process.exit()
  }
}

const saveFiles = async () => {
  try {
    const files = await getFileData()
    files.map(file => {
      flattenAndSave(file)
    })
  } catch (e) {
    console.log(e.message)
    process.exit()
  }
}

const saveToDB = obj => {
  const query = { fileId: obj.fileId }
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  // find and update or insert new
  check
    .findOneAndUpdate(query, obj, options, err => {
      if (err) {
        console.log(err.message)
      }
    })
    .exec()
}

module.exports.saveFile = saveFile
module.exports.saveFiles = saveFiles
