// Import the watching library
const watchr = require('watchr')
const watchPath = process.env.CHECKS_PATH

// define the actual singleton instance
// ------------------------------------
const Queue = require('better-queue')

const counter = new Queue(async (file, cb) => {
  await saveFile(file)
  cb()
})

counter.on('task_queued', result => {
  console.log('task_queued', result)
})

counter.on('task_started', result => {
  console.log('task_started', result)
})

counter.on('task_finish', result => {
  console.log('task_finish', result)
})

const { saveFile } = require('../save')
const { readFile } = require('../readFile')

const saveWatchedFile = async fullPath => {
  // "checks/0-1542896172725.json"
  const file = await readFile(fullPath)

  counter.push(JSON.parse(file), () => {
    console.log('saved')
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
