// Import the watching library
const watchr = require('watchr')
const watchPath = process.env.CHECKS_PATH
const { saveFile } = require('../save')
const { readFile } = require('../readFile')
const queue = require('async/queue')
let counter = 0

const globalQueue = queue(async (file, cb) => {
  await saveFile(file)
  counter++
  cb()
}, 1)

const saveWatchedFile = async fullPath => {
  // "checks/0-1542896172725.json"
  const file = await readFile(fullPath)
  const data = JSON.parse(file)
  globalQueue.push(data, () => {
    console.log(`finished processing ${fullPath} ${counter}`)
  })

  // saveFile(JSON.parse(file))
}

// Define our watching parameters
const listener = (changeType, fullPath) => {
  switch (changeType) {
    case 'create':
      console.log('The file', fullPath, 'was created')
      saveWatchedFile(fullPath)
      break
  }
}

function next(err) {
  if (err) return console.log('Watch failed on', watchPath, 'with error', err)
  console.log('💡 Watching on', watchPath)
}

const watchChecks = () => {
  // Watch the path with the change listener and completion callback
  return watchr.open(watchPath, listener, next)
}

module.exports.saveWatchedFile = saveWatchedFile
module.exports.watchChecks = watchChecks
