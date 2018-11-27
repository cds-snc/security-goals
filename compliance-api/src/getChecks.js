const { promises: fs, constants: fsConstants } = require('fs')
const { parse, join } = require('path') // eslint-disable-line no-unused-vars

const getChecks = async (path = '/checks') => {
  try {
    let access = await fs.access(path, fsConstants.R_OK) // eslint-disable-line no-unused-vars
  } catch ({ message }) {
    throw new Error(`Checks directory isn't a readable directory: ${message}`)
  }
  let files = await fs.readdir(path)
  let jsonFiles = files
    .filter(f => f.match(/.json$/) !== null)
    .map(f => join(path, f.match(/.json$/).input))
  let checks = await Promise.all(
    jsonFiles.map(file => fs.readFile(file, { encoding: 'utf-8' })),
  )

  return checks.map(c => JSON.parse(c))
}
module.exports.getChecks = getChecks
