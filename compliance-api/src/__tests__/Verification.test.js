const { Verification } = require('../types/Verification')

describe('Verification Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(Verification.getFields())
    const expected = [
      'origin',
      'timestamp',
      'passed',
      'description',
      'satisfies',
      'component',
      'references',
    ]

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
