const { ITSG33a } = require('../types/ITSG33a')

describe('ITSG33a Type', () => {
  it(`has fields for each of Damien's 36 theses`, () => {
    let fields = Object.keys(ITSG33a.getFields())
    expect(fields).toHaveLength(36)
  })
})
