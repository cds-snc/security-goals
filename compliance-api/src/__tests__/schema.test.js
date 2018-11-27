/* global fetch */
global.fetch = require('jest-fetch-mock')
const fs = require('fs')
const { graphql } = require('graphql')
const { schema } = require('../schema')
const { getChecks } = require('../getChecks.js')
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
    checks = await getChecks('src/__tests__/testData/checks')
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
        verifications {
          origin
          passed
        }
      }
    }
    `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data.controls).toContainObject({
        family: 'SA',
        id: 'SA-11 (1)',
        name: 'Developer Security Testing',
        verifications: [
          {
            origin: 'sa_11_1:latest',
            passed: 'true',
          },
        ],
      })
    })
  })

  describe('verifiedControls', () => {
    it('returns the list of controls with checks that pass', async () => {
      let query = `
        {
          verifiedControls {
            id
            name
            family
            verifications {
              origin
              passed
            }
          }
        }
      `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data.verifiedControls).toContainObject({ id: 'SA-11 (1)' })
    })
  })

  describe('failedControls', () => {
    it('returns the list of controls with checks that fail', async () => {
      let query = `
        {
          failedControls {
            id
            name
            family
            verifications {
              origin
              passed
            }
          }
        }
      `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data.failedControls).toContainObject({ id: 'CA-2 (2)' })
    })
  })
  describe('control', () => {
    it('returns a control specified by name', async () => {
      let query = `
        {
          control(id: "SI-10") {
            id
            name
            family
          }
        }
      `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      let { control } = result.data
      expect(control).toEqual({
        family: 'SI',
        id: 'SI-10',
        name: 'Information Input Validation',
      })
    })
  })

  describe('totals', () => {
    it('returns passed + total for verified and failed controls', async () => {
      let query = `
      {
        totals{
          total
          passed
        }
      }
    `

      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data).toEqual({
        totals: {
          total: 11,
          passed: 5,
        },
      })
    })
  })

  //
  describe('release hash', () => {
    it('can get a verification release hash', async () => {
      let query = `
      {
        verifiedControls{
          id
          verifications{
            release
          }
        }
      }
    `
      let result = await graphql(schema, query, compliancePosture)
      expect(result).not.toHaveProperty('errors')
      expect(result.data.verifiedControls).toContainObject({
        id: 'CM-8 (1)',
        verifications: [
          {
            release: '60e61288-ef33-11e8-908e-06d86cf01138',
          },
        ],
      })
    })
  })
  //
})
