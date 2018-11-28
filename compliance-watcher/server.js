require = require('esm')(module) // eslint-disable-line no-global-assign
module.exports = require('./lib/watcher.js')
module.exports.restartJobs()
