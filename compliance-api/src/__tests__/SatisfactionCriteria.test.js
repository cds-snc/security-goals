const { SatisfactionCriteria } = require('../types/SatisfactionCriteria')

describe('SatisfactionCriteria Type', () => {
  it('has the correct fields', () => {
    const fields = Object.keys(SatisfactionCriteria.getFields())
    const expected = [
      'control_key',
      'covered_by',
      'implementation_statuses',
      'references',
      'control_origins',
      'narrative',
      'parameters',
      'standard_key',
    ]

    expect(fields).toEqual(expect.arrayContaining(expected))
  })
})
