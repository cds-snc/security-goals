/* global fetch */
global.fetch = require('jest-fetch-mock')
const { fetchYaml } = require('../fetchYaml')

describe('fetchYaml', () => {
  it('raises an error when called with no arguments', async () => {
    try {
      await fetchYaml()
    } catch ({ message }) {
      expect(message).toMatch(/you must provide a url/)
    }
  })

  it('raises an error when called with a bad URL', async () => {
    try {
      await fetchYaml('not a url')
    } catch ({ message }) {
      expect(message).toMatch(/not a valid URL/)
    }
  })

  it(`raises an error when the URL isn't pointing to a .yaml file`, async () => {
    try {
      await fetchYaml('https://example.com/fluffy-kittens.jpg')
    } catch ({ message }) {
      expect(message).toMatch(/needs to point to a YAML file/)
    }
  })

  it('returns a baseline object given a URL', async () => {
    fetch.mockResponseOnce(`
name: light
standards:
  ITSG-33a:
    AC-2: {}
    AC-3: {}
    AC-6: {}
    AU-2: {}
    AU-6: {}
`)
    let baseline = await fetchYaml('https://example.com/baseline.yaml')
    expect(baseline).toEqual({
      name: 'light',
      standards: {
        'ITSG-33a': {
          'AC-2': {},
          'AC-3': {},
          'AC-6': {},
          'AU-2': {},
          'AU-6': {},
        },
      },
    })
  })
})
