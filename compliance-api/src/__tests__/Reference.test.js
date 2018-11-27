const { Reference } = require('../types/Reference')

describe('Reference Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(Reference.getFields())
    const expected = ['name', 'type', 'path']

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
