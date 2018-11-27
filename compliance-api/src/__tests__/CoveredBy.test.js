const { CoveredBy } = require('../types/CoveredBy')

describe('CoveredBy Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(CoveredBy.getFields())
    const expected = ['system_key', 'component_key', 'verification_key']

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
