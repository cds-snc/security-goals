const { promises: fs } = require('fs')
const { basename } = require('path')

const getFileName = filepath => {
  return basename(filepath, '.json')
}

const readFile = async file => {
  const content = await fs.readFile(file, { encoding: 'utf-8' })
  const obj = JSON.parse(content)
  // add filename to content for reference
  obj.fileRef = getFileName(file)
  return JSON.stringify(obj)
}

module.exports.readFile = readFile
