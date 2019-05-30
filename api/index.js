require('dotenv-safe').config({ allowEmptyValues: true })
const { fetchYaml } = require('./dist/fetchYaml.js')
const { complianceDefinitions } = require('./dist/complianceDefinitions.js')
const { Server } = require('./dist/server')
const { dbConnect } = require('./dist/db/connect')
const { clearCollection } = require('./dist/db/clearCollection')
const { watchChecks } = require('./dist/watcher')
const { saveFiles } = require('./dist/db/save')

(async () => {
  const { DEFINITIONS_URL: definitionsUrl } = process.env;

  let definitions = await fetchYaml(definitionsUrl);

  let compliancePosture = await complianceDefinitions(definitions);

  let server = Server(compliancePosture);

  const port = parseInt(process.env.PORT, 10) || 3000;

  server.listen(port, async err => {
    if (err) throw err;

    console.log(`⚡ Ready on http://localhost:${port}`);

    try {
      await dbConnect();
      await clearCollection();
      await watchChecks();
      await saveFiles();
    } catch (e) {
      console.log(e.message);
    }
  });
})();
