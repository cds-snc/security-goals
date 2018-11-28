require('dotenv-safe').config()
const { getChecks } = require('./src/getChecks.js')
const { fetchYaml } = require('./src/fetchYaml.js')
const { createCompliance } = require('./src/createCompliance.js')
const { Server } = require('./src/Server')
const { dbConnect } = require('./src/db/connect')
const { watchChecks } = require('./src/db/watcher')
const { saveFiles } = require('./src/db/save')
;(async () => {
  const {
    CHECKS_PATH: checksPath,
    DEFINITIONS_URL: definitionsUrl,
    CERTIFICATION_URL: certificationUrl,
  } = process.env

  let checks = await getChecks(checksPath)
  let certification = await fetchYaml(certificationUrl)
  let definitions = await fetchYaml(definitionsUrl)

  let compliancePosture = await createCompliance({
    definitions,
    checks,
    certification,
  })

  let server = Server(compliancePosture)

  const port = parseInt(process.env.PORT, 10) || 3000

  server.listen(port, async err => {
    if (err) throw err

    console.log(`⚡ Ready on http://localhost:${port}`)

    await dbConnect()
    saveFiles()
    watchChecks()
  })
})()
