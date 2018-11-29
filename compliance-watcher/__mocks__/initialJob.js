export const initialJob = {
  metadata: {
    name: 'pi',
    namespace: 'symmorfosi-jobs',
    selfLink: '/apis/batch/v1/namespaces/symmorfosi-jobs/jobs/pi',
    uid: '5b4c7609-f3e4-11e8-ad6a-080027e70adc',
    resourceVersion: '28420',
    creationTimestamp: '2018-11-29T14:37:54Z',
    labels: {
      'controller-uid': '5b4c7609-f3e4-11e8-ad6a-080027e70adc',
      'job-name': 'pi',
    },
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration':
        '{"apiVersion":"batch/v1","kind":"Job","metadata":{"annotations":{},"name":"pi","namespace":"symmorfosi-jobs"},"spec":{"backoffLimit":4,"template":{"spec":{"containers":[{"command":["perl","-Mbignum=bpi","-wle","print bpi(2000)"],"image":"perl","name":"pi"}],"restartPolicy":"Never"}}}}\n',
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
    startTime: '2018-11-29T14:37:54Z',
    completionTime: '2018-11-29T14:38:01Z',
    succeeded: 1,
  },
}
