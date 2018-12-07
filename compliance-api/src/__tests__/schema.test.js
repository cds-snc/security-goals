/* global fetch */
global.fetch = require('jest-fetch-mock')
const fs = require('fs')
const { graphql } = require('graphql')
const { schema } = require('../schema')
const { fetchYaml } = require('../fetchYaml.js')
const { createCompliance } = require('../createCompliance.js')
const { matchObjectInArray } = require('../utils/jestMatchers')

// extend jest with a custom matcher
expect.extend(matchObjectInArray())

fetch.mockResponses(
  [
    `
name: nano
standards:
  ITSG-33a:
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

let checks, certification, definitions, compliancePosture

describe('GraphQL Schema', () => {
  beforeAll(async () => {
    // real fixture path
    checks = []
    // fake but valid url, response is just from the mock
    // first call gets the first mock with the certification
    certification = await fetchYaml('https://example.com/foo.yaml')

    // second call gets second mock with the full definitions
    definitions = await fetchYaml('https://example.com/ITSG-33a.yaml')

    compliancePosture = await createCompliance({
      definitions,
      checks,
      certification,
    })
  })

  describe('Query type', () => {
    it('has a controls field defined', () => {
      let Query = schema.getType('Query')
      let fields = Query.getFields()
      expect(fields).toHaveProperty('controls')
    })
  })

  describe('controls', () => {
    it('returns a list of all known controls', async () => {
      let query = `
        {
          controls {
            id
            name
            family
          }
        }
        `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data.controls).toContainObject({
        family: 'SA',
        id: 'SA-11 (1)',
        name: 'Developer Security Testing',
      })
    })
  })
})
