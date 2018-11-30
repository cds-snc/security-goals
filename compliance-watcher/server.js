require = require('esm')(module) // eslint-disable-line no-global-assign
module.exports = require('./lib/watcher.js')
const port = parseInt(process.env.PORT, 10) || 4000
module.exports.startWatcher(port)
