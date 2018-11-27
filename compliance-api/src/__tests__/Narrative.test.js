const { Narrative } = require('../types/Narrative')

describe('Narrative Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(Narrative.getFields())
    const expected = ['key', 'text']

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
