async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const modifyJob = job => {
  if (
    job === undefined ||
    job === {} ||
    !('metadata' in job) ||
    !('name' in job.metadata) ||
    !('annotations' in job.metadata) ||
    !(
      'kubectl.kubernetes.io/last-applied-configuration' in
      job.metadata.annotations
    )
  ) {
    return {}
  }

  const name = job.metadata.name

  // Get previous configuration
  let body = JSON.parse(
    job.metadata.annotations[
      'kubectl.kubernetes.io/last-applied-configuration'
    ],
  )

  // Update name of job container
  if (name.includes('-symmorfosi-auto-')) {
    body.metadata.name = `${name.substring(
      0,
      name.indexOf('-symmorfosi-auto-'),
    )}-symmorfosi-auto-${Date.now()}`
  } else {
    body.metadata.name = `${name}-symmorfosi-auto-${Date.now()}`
  }

  // Re-apply new configuration
  body.metadata.annotations[
    'kubectl.kubernetes.io/last-applied-configuration'
  ] = JSON.stringify(body)
  return body
}

export const restartJobs = async config => {
  const k8s = require('@kubernetes/client-node')
  const kc = config || new k8s.KubeConfig().loadFromDefault()
  const jobsApi = kc.makeApiClient(k8s.Batch_v1Api)
  const namespace = process.env.JOBS_NAMESPACE || 'symmorfosi-jobs'

  const res = await jobsApi.listNamespacedJob(namespace)
  if ('items' in res.body) {
    // The mechanic to delete and re-create jobs is going to be
    // refactored in Kubernetes API 1.12 with TTL on jobs.
    // https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#job-termination-and-cleanup
    return asyncForEach(res.body.items, async item => {
      let name = item.metadata.name
      jobsApi.deleteNamespacedJob(name, namespace, item)
      const body = modifyJob(item)
      await jobsApi.createNamespacedJob(namespace, body)
    })
  }
}

export const startWatcher = port => {
  const express = require('express')
  const helmet = require('helmet')
  const app = express()
  app.use(helmet())

  const uuid = require('uuid/v4')()
  const path = process.env.WEBHOOK_URL || uuid

  app.get('/monitoring/alive', (req, res) => {
    res.status(200).send('yes')
  })

  app.get('/monitoring/ready', (req, res) => {
    res.status(200).send('yes')
  })

  app.post(`/${path}`, function(req, res) {
    if (process.env.NODE_ENV !== 'test') {
      restartJobs()
    }
    res.send('Restarting Jobs')
  })

  return app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    console.log(`> Webhook listening on: /${path}`)
  })
}
