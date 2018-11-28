const { promises: fs, constants: fsConstants } = require('fs')
const { join, basename } = require('path') // eslint-disable-line no-unused-vars
const { readFile } = require('./readFile')

const getChecks = async (path = process.env.CHECKS_PATH) => {
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
    jsonFiles.map(async file => {
      return readFile(file)
    }),
  )

  return checks.map(c => {
    return JSON.parse(c)
  })
}

module.exports.getChecks = getChecks
