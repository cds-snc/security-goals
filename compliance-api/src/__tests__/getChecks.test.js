const { getChecks } = require('../getChecks.js')

describe('getChecks', () => {
  it('returns an array of check objects from json files', async () => {
    let [check] = await getChecks('src/__tests__/testData/checks')
    expect(check.references).toEqual('kube-hunter')
  })

  it(`throws an error is the directory isn't readable`, async () => {
    try {
      await getChecks('asdfasdf')
    } catch ({ message }) {
      expect(message).toMatch(/isn't a readable directory/)
    }
  })
})
