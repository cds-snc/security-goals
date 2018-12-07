require('dotenv-safe').config({ allowEmptyValues: true })
const { fetchYaml } = require('./src/fetchYaml.js')
const { createCompliance } = require('./src/createCompliance.js')
const { Server } = require('./src/server')
const { dbConnect } = require('./src/db/connect')
const { clearCollection } = require('./src/db/clearCollection')
const { watchChecks } = require('./src/db/watcher')
const { saveFiles } = require('./src/db/save')
;(async () => {
  const {
    DEFINITIONS_URL: definitionsUrl,
    CERTIFICATION_URL: certificationUrl,
  } = process.env

  let checks = []
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

    try {
      await dbConnect()
      await clearCollection()
      await watchChecks()
      await saveFiles()
    } catch (e) {
      console.log(e.message)
    }
  })
})()
