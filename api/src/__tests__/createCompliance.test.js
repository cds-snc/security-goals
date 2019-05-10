/* global fetch */
global.fetch = require('jest-fetch-mock')
const fs = require('fs')
const { fetchYaml } = require('../fetchYaml.js')
const { createCompliance } = require('../createCompliance.js')

fetch.mockResponses(
  [
    `
name: nano
standards:
  ITSG-33a:
    AC-1: {}
    AU-6: {}
    SA-11 (1): {}
`,
    { status: 200 },
  ],
  [
    fs.readFileSync('src/__tests__/testData/definitions/ITSG-33a.yaml'),
    { status: 200 },
  ],
)

let checks, certification, definitions

describe('createCompliance', () => {
  beforeAll(async () => {
    // real fixture path
    checks = []
    // fake but valid url, response is just from the mock
    // first call gets the first mock with the certification
    certification = await fetchYaml('https://example.com/foo.yaml')
    // second call gets second mock with the full definitions
    definitions = await fetchYaml('https://example.com/ITSG-33a.yaml')
  })

  describe('without checks', () => {
    it('returns an object containing all the controls in the certification', async () => {
      let compliancePosture = await createCompliance({
        definitions,
        checks: [],
        certification,
      })

      let keys = Object.keys(compliancePosture)
      expect(keys).toHaveLength(3)
    })
  })
})
