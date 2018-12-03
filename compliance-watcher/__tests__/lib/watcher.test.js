import request from 'supertest'
import {
  generateReleaseId,
  modifyJob,
  restartJobs,
  startWatcher,
} from '../../lib/watcher'
import { initialJob } from '../../__mocks__/initialJob'
import { initialJobNoEnv } from '../../__mocks__/initialJobNoEnv'
import { nextJob } from '../../__mocks__/nextJob'

const k8s = require('@kubernetes/client-node')
let nock = require('nock')

describe('generateReleaseId', () => {
  it('returns a unix time stamp for a release if not github repo is defined', async () => {
    expect(await generateReleaseId()).not.toEqual(null)
  })
  it('returns a unix time stamp with a sha from a github repo if it is defined', async () => {
    process.env.GITHUB_REPO = 'foo/bar'
    nock('https://api.github.com/')
      .persist()
      .get('/repos/foo/bar/commits?branch=master')
      .reply(200, [{ sha: 'abcd' }])
    expect(await generateReleaseId()).toContain('abcd')
  })
})

describe('modifyJob', () => {
  it('handles invalid entries', async () => {
    expect(await modifyJob()).toEqual({})
    expect(await modifyJob({})).toEqual({})
    expect(await modifyJob({ foo: 'bar' })).toEqual({})
    expect(await modifyJob({ metadata: {} })).toEqual({})
    expect(await modifyJob({ metadata: { name: '' } })).toEqual({})
    expect(
      await modifyJob({ metadata: { name: '', annotations: {} } }),
    ).toEqual({})
  })

  it('adds metadata for jobs that were added manually', async () => {
    const modifiedJob = await modifyJob(initialJob)
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
    const modifiedNextJob = await modifyJob(nextJob)
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

  it('modifies the release on a job if it already exists', async () => {
    const modifiedNextJob = await modifyJob(nextJob)
    expect(modifiedNextJob.spec.template.spec.containers[0].env).not.toEqual(
      nextJob.spec.template.spec.containers[0].env,
    )
  })

  it('adds the release on a job if it does not exist and an env variables exit', async () => {
    const modifiedNextJob = await modifyJob(initialJob)
    expect(modifiedNextJob.spec.template.spec.containers[0].env).not.toEqual(
      null,
    )
  })

  it('adds the release on a job if it does not exist and no env variables exit', async () => {
    const modifiedNextJob = await modifyJob(initialJobNoEnv)
    expect(modifiedNextJob.spec.template.spec.containers[0].env).not.toEqual(
      null,
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
    expect(scope.pendingMocks()).toEqual([])
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
  it('takes a WEBHOOK_URL for its routing', async done => {
    process.env.WEBHOOK_URL = 'foo'
    let app = startWatcher(4000)

    const response = await request(app).post('/foo')
    expect(response.status).toEqual(200)
    app.close()
    done()
  })

  it('has an alive check', async done => {
    let app = startWatcher(4000)

    const response = await request(app).get('/monitoring/alive')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('yes')
    app.close()
    done()
  })

  it('has a ready check', async done => {
    let app = startWatcher(4000)

    const response = await request(app).get('/monitoring/ready')
    expect(response.status).toEqual(200)
    expect(response.text).toEqual('yes')
    app.close()
    done()
  })
})
