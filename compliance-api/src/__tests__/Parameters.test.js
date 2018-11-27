const { Parameters } = require('../types/Parameters')

describe('Parameters Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(Parameters.getFields())
    const expected = ['key', 'text']

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
