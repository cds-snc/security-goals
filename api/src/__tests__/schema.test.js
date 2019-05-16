/* global fetch */
global.fetch = require('jest-fetch-mock')
const fs = require('fs')
const { graphql } = require('graphql')
const { schema } = require('../schema')
const { fetchYaml } = require('../fetchYaml.js')
const { complianceDefinitions } = require('../complianceDefinitions.js')
const { matchObjectInArray } = require('../utils/jestMatchers')

// extend jest with a custom matcher
expect.extend(matchObjectInArray())

fetch.mockResponses([
  fs.readFileSync('src/__tests__/testData/definitions/ITSG-33a.yaml'),
  { status: 200 },
])

let definitions, compliancePosture

describe('GraphQL Schema', () => {
  beforeAll(async () => {
    // real fixture path

    // all gets mock with the sample definitions
    definitions = await fetchYaml('https://example.com/ITSG-33a.yaml')

    compliancePosture = await complianceDefinitions(definitions)
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
        family: 'AC',
        id: 'AC-2 (3)',
        name: 'Account Management',
      })
    })
  })
})
