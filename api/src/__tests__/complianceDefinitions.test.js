/* global fetch */
global.fetch = require('jest-fetch-mock')
const fs = require('fs')
const { fetchYaml } = require('../fetchYaml.js')
const { complianceDefinitions } = require('../complianceDefinitions.js')

fetch.mockResponses([
  fs.readFileSync('src/__tests__/testData/definitions/ITSG-33a.yaml'),
  { status: 200 },
])

let definitions

describe('complianceDefinitions', () => {
  beforeAll(async () => {
    // real fixture path
    // gets mock with the sample definitions
    definitions = await fetchYaml('https://example.com/ITSG-33a.yaml')
  })

  describe('without checks', () => {
    it('returns an object containing all the controls', async () => {
      let compliancePosture = await complianceDefinitions(definitions)

      let keys = Object.keys(compliancePosture)
      expect(keys).toHaveLength(6)
    })
  })
})
