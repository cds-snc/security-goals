const data = [
  {
    release: '60e61288-ef33-11e8-908e-06d86cf01138',
    controls: [
      {
        control: 'CA-2 (7)',
        fileId: 'x-mock-response',
        verifications: {
          'CA-2 (7)': {
            origin: 'cdssnc/pod-check-compliance:latest',
            timestamp: '2018-11-19T17:21:44Z',
            passed: false,
            description:
              'The cluster uses Kube hunter for vulnerability scanning.',
            references: 'kube-hunter',
            component: 'Infrastructure',
            release: '60e61288-ef33-11e8-908e-06d86cf01138',
            fileRef: '0-1542896172725',
          },
        },
      },
      {
        control: 'CA-2 (2)',
        fileId: 'x-mock-response',
        verifications: {
          'CA-2 (2)': {
            origin: 'cdssnc/pod-check-compliance:latest',
            timestamp: '2018-11-19T17:21:44Z',
            passed: false,
            description:
              'The cluster uses Kube hunter for vulnerability scanning.',
            references: 'kube-hunter',
            component: 'Infrastructure',
            release: '60e61288-ef33-11e8-908e-06d86cf01138',
            fileRef: '0-1542896172725',
          },
        },
      },
    ],
  },
  {
    release: 'x-mock-relase',
    controls: [
      {
        control: 'CA-2 (7)',
        fileId: 'x-mock-response',
        verifications: {
          'CA-2 (1)': {
            origin: 'cdssnc/pod-check-compliance:latest',
            timestamp: '2018-11-19T17:21:44Z',
            passed: false,
            description:
              'The cluster uses Kube hunter for vulnerability scanning.',
            references: 'kube-hunter',
            component: 'Infrastructure',
            release: '60e61288-ef33-11e8-908e-06d86cf01138',
            fileRef: '0-1542896172725',
          },
        },
      },
    ],
  },
]

module.exports = {
  checkExists: jest.fn(() => {
    return data
  }),
}
