require('dotenv-safe').config({ allowEmptyValues: true })
const { fetchYaml } = require('./dist/fetchYaml.js')
const { createCompliance } = require('./dist/createCompliance.js')
const { Server } = require('./dist/server')
const { dbConnect } = require('./dist/db/connect')
const { clearCollection } = require('./dist/db/clearCollection')
const { watchChecks } = require('./dist/db/watcher')
const { saveFiles } = require('./dist/db/save')

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
