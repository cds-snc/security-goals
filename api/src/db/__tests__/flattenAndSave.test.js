const { flattenAndSave } = require('../save')
const fs = require('fs')
const path = require('path')

jest.mock('../queries')

const logToFile = result => {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, 'log.json'),
      JSON.stringify(result, null, 4),
    )
  } catch (err) {
    // An error occurred
    console.error(err)
  }
}

const fixture = {
  origin: 'cdssnc/pod-check-compliance:latest',
  timestamp: '2018-11-19T17:21:44Z',
  satisfies: ['CA-2 (2)', 'RA-5'],
  passed: false,
  description: 'The cluster uses Kube hunter for vulnerability scanning.',
  references: 'kube-hunter',
  component: 'Infrastructure',
  release: '60e61288-ef33-11e8-908e-06d86cf01138',
}

const mockSave = jest.fn(async obj => {
  return obj
})

describe('flattenAndSave', () => {
  it('keeps existing control data', async () => {
    const result = await flattenAndSave(fixture, mockSave)
    expect(mockSave.mock.calls.length).toBe(1)
    expect(result.controls[0].control).toEqual('CA-2 (7)')
  })

  it('keeps existing release data', async () => {
    await flattenAndSave(fixture, mockSave)
    expect(mockSave.mock.calls.length).toBe(1)
  })

  it('keeps existing control if multiple exists', async () => {
    const result = await flattenAndSave(fixture, mockSave)
    logToFile(result)
  })

  it('removes duplicate controls if multiple exists', async () => {})
})
