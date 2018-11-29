export const nextJob = {
  metadata: {
    name: 'pi-symmorfosi-auto-1543502899181',
    namespace: 'symmorfosi-jobs',
    selfLink:
      '/apis/batch/v1/namespaces/symmorfosi-jobs/jobs/pi-symmorfosi-auto-1543502899181',
    uid: 'cf96d983-f3e5-11e8-ad6a-080027e70adc',
    resourceVersion: '29122',
    creationTimestamp: '2018-11-29T14:48:19Z',
    labels: {
      'controller-uid': 'cf96d983-f3e5-11e8-ad6a-080027e70adc',
      'job-name': 'pi-symmorfosi-auto-1543502899181',
    },
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration':
        '{"apiVersion":"batch/v1","kind":"Job","metadata":{"annotations":{},"name":"pi-symmorfosi-auto-1543502899181","namespace":"symmorfosi-jobs"},"spec":{"backoffLimit":4,"template":{"spec":{"containers":[{"command":["perl","-Mbignum=bpi","-wle","print bpi(2000)"],"image":"perl","name":"pi"}],"restartPolicy":"Never"}}}}',
    },
  },
  spec: {
    parallelism: 1,
    completions: 1,
    backoffLimit: 4,
    selector: {
      matchLabels: [Object],
    },
    template: {
      metadata: [Object],
      spec: [Object],
    },
  },
  status: {
    conditions: [[Object]],
    startTime: '2018-11-29T14:48:19Z',
    completionTime: '2018-11-29T14:48:25Z',
    succeeded: 1,
  },
}
