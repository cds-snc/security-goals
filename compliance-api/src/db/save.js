const { dbConnect } = require('./connect')
const { createModel } = require('./schema')
const { getChecks } = require('./getChecks')

const getFileData = async () => {
  try {
    const data = await getChecks()
    return data
  } catch (e) {
    console.log(e.message)
  }
}

const flattenAndSave = (file = false, Model = false) => {
  if (!file || !file.satisfies) return

  file.satisfies.forEach(control => {
    let obj = { ...file, control, fileId: `${file.fileRef}--${control}` }
    saveToDB(obj, Model)
  })
}

const saveToDB = (obj, Model) => {
  const query = { fileId: obj.fileId }
  const options = { upsert: true, new: true, setDefaultsOnInsert: true }

  // find and update or insert new
  Model.findOneAndUpdate(query, obj, options, (err, result) => {
    if (err) {
      console.log(err.message)
      return
    }
    console.log(result.fileId + ' saved')
  })
}

const saveFile = async file => {
  try {
    const db = await dbConnect()
    const CheckModel = await createModel(db)
    flattenAndSave(file, CheckModel)
  } catch (e) {
    console.log(e.message)
    process.exit()
  }
}

const saveFiles = async () => {
  try {
    const db = await dbConnect()
    const files = await getFileData()
    const CheckModel = await createModel(db)
    files.map(file => {
      flattenAndSave(file, CheckModel)
    })
  } catch (e) {
    console.log(e.message)
    process.exit()
  }
}
module.exports.saveFile = saveFile
module.exports.saveFiles = saveFiles
