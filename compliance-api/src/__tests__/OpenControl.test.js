const { OpenControl } = require('../types/OpenControl')

describe('OpenControl Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(OpenControl.getFields())
    const expected = ['name', 'family', 'description']

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
