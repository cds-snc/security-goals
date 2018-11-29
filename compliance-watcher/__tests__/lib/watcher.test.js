import request from 'supertest'
import { modifyJob, restartJobs, startWatcher } from '../../lib/watcher'
import { initialJob } from '../../__mocks__/initialJob'
import { nextJob } from '../../__mocks__/nextJob'

const k8s = require('@kubernetes/client-node')
let nock = require('nock')

describe('modifyJob', () => {
  it('handles invalid entries', async () => {
    expect(modifyJob()).toEqual({})
    expect(modifyJob({})).toEqual({})
    expect(modifyJob({ foo: 'bar' })).toEqual({})
    expect(modifyJob({ metadata: {} })).toEqual({})
    expect(modifyJob({ metadata: { name: '' } })).toEqual({})
    expect(modifyJob({ metadata: { name: '', annotations: {} } })).toEqual({})
  })

  it('adds metadata for jobs that were added manually', async () => {
    const modifiedJob = modifyJob(initialJob)
    expect(modifiedJob.metadata.name).not.toEqual(initialJob.name)
    expect(
      modifiedJob.metadata.annotations[
        'kubectl.kubernetes.io/last-applied-configuration'
      ],
    ).not.toEqual(
      initialJob.metadata.annotations[
        'kubectl.kubernetes.io/last-applied-configuration'
      ],
    )
  })

  it('modifies metadata for an already modified job', async () => {
    const modifiedNextJob = modifyJob(nextJob)
    expect(modifiedNextJob.metadata.name).not.toEqual(nextJob.name)
    expect(
      modifiedNextJob.metadata.annotations[
        'kubectl.kubernetes.io/last-applied-configuration'
      ],
    ).not.toEqual(
      nextJob.metadata.annotations[
        'kubectl.kubernetes.io/last-applied-configuration'
      ],
    )
  })
})

describe('restartJobs', () => {
  const kc = new k8s.KubeConfig()
  const server = 'https://foo.company.com'
  kc.clusters = [
    {
      name: 'cluster',
      server,
    },
  ]
  kc.contexts = [
    {
      cluster: 'cluster',
      user: 'user',
    },
  ]
  kc.users = [
    {
      name: 'user',
    },
  ]

  it('looks for jobs in a default namespace', async () => {
    let scope = nock('https://foo.company.com')
      .get('/apis/batch/v1/namespaces/symmorfosi-jobs/jobs')
      .reply(200, {})
    await restartJobs(kc)
    expect(scope.pendingMocks()).toEqual([])
  })

  it('deletes a returned job and recreates it', async () => {
    let scope = nock('https://foo.company.com')
      .get('/apis/batch/v1/namespaces/symmorfosi-jobs/jobs')
      .reply(200, { items: [initialJob] })
      .delete(
        `/apis/batch/v1/namespaces/symmorfosi-jobs/jobs/${
          initialJob.metadata.name
        }`,
      )
      .reply(200)
      .post(`/apis/batch/v1/namespaces/symmorfosi-jobs/jobs`)
      .reply(200)
    await restartJobs(kc)
    expect(scope.activeMocks().length).toEqual(2)
  })

  it('looks for jobs in a user defined namespace', async () => {
    process.env.JOBS_NAMESPACE = 'fizz'
    let scope = nock('https://foo.company.com')
      .get('/apis/batch/v1/namespaces/fizz/jobs')
      .reply(200, {})
    await restartJobs(kc)
    expect(scope.pendingMocks()).toEqual([])
  })
})

describe('startWather', () => {
  it('takes a WEBHOOK_URL for it routing', async done => {
    process.env.WEBHOOK_URL = 'foo'
    let app = startWatcher(4000)

    const response = await request(app).post('/foo')
    expect(response.status).toEqual(200)
    app.close()
    done()
  })
})
