const { forceBoolean } = require('../utils/forceBoolean')

describe('Forces a boolean', () => {
  it(`return true for the boolean true`, () => {
    const result = forceBoolean(true)
    expect(result).toEqual(true)
  })

  it(`return true for the string TRUE`, () => {
    const result = forceBoolean('TRUE')
    expect(result).toEqual(true)
  })

  it(`return true for the string 'true'`, () => {
    const result = forceBoolean('true')
    expect(result).toEqual(true)
  })

  it(`return false for the string 'false'`, () => {
    const result = forceBoolean('false')
    expect(result).toEqual(false)
  })

  it(`return false for the boolean false`, () => {
    const result = forceBoolean(false)
    expect(result).toEqual(false)
  })

  it(`return true for the string FALSE`, () => {
    const result = forceBoolean('FALSE')
    expect(result).toEqual(false)
  })
})
