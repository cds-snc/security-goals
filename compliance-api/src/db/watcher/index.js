// Import the watching library
const { resolve } = require('path')
const watchr = require('watchr')
const watchPath = resolve(__dirname, '../../', 'checks')
const { saveFile } = require('../save')
const { readFile } = require('../readFile')

const saveWatchedFile = async fullPath => {
  // "checks/0-1542896172725.json"
  const file = await readFile(fullPath)
  saveFile(JSON.parse(file))
}

// Define our watching parameters
const listener = (changeType, fullPath) => {
  switch (changeType) {
    case 'update':
      console.log('the file', fullPath, 'was updated')
      break
    case 'create':
      console.log('the file', fullPath, 'was created')
      saveWatchedFile(fullPath)
      break
    case 'delete':
      console.log('the file', fullPath, 'was deleted')
      break
  }
}

function next(err) {
  if (err) return console.log('watch failed on', watchPath, 'with error', err)
  console.log('watch successful on', watchPath)
}

const watchChecks = () => {
  // Watch the path with the change listener and completion callback
  return watchr.open(watchPath, listener, next)
}

module.exports.saveWatchedFile = saveWatchedFile
module.exports.watchChecks = watchChecks
