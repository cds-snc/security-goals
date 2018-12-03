import fetch from 'isomorphic-fetch'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export const generateReleaseId = async () => {
  if (process.env.GITHUB_REPO !== undefined) {
    let repo = process.env.GITHUB_REPO
    return fetch('//api.github.com/repos/' + repo + '/commits?branch=master')
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then(function(commits) {
        return `${commits[0].sha}-${Date.now()}`
      })
  } else {
    return `${Date.now()}`
  }
}

export const modifyJob = async job => {
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

  // Generate release ID
  const releaseId = await generateReleaseId()

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

  // Update Release ENV
  if ('env' in body.spec.template.spec.containers[0]) {
    let applied = false
    body.spec.template.spec.containers[0].env.forEach(e => {
      if (e.name === 'RELEASE') {
        e.value = releaseId
        applied = true
      }
    })
    if (!applied) {
      body.spec.template.spec.containers[0].env.push({
        name: 'RELEASE',
        value: releaseId,
      })
    }
  } else {
    body.spec.template.spec.containers[0]['env'] = [
      { name: 'RELEASE', value: releaseId },
    ]
  }

  // Re-apply new configuration
  body.metadata.annotations[
    'kubectl.kubernetes.io/last-applied-configuration'
  ] = JSON.stringify(body)
  return body
}

export const restartJobs = async config => {
  const k8s = require('@kubernetes/client-node')
  let kc
  if (config) {
    kc = config
  } else {
    kc = new k8s.KubeConfig()
    if (process.env.NODE_ENV === 'production') {
      kc.loadFromCluster()
    } else {
      kc.loadFromDefault()
    }
  }
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
      const body = await modifyJob(item)
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
