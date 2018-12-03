export const initialJobNoEnv = {
  kind: 'Job',
  apiVersion: 'batch/v1',
  metadata: {
    name: 'pi',
    namespace: 'symmorfosi-jobs',
    selfLink: '/apis/batch/v1/namespaces/symmorfosi-jobs/jobs/pi',
    uid: 'e886d267-f717-11e8-9655-080027e70adc',
    resourceVersion: '143735',
    creationTimestamp: '2018-12-03T16:24:29Z',
    labels: {
      'controller-uid': 'e886d267-f717-11e8-9655-080027e70adc',
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
      matchLabels: {
        'controller-uid': 'e886d267-f717-11e8-9655-080027e70adc',
      },
    },
    template: {
      metadata: {
        creationTimestamp: null,
        labels: {
          'controller-uid': 'e886d267-f717-11e8-9655-080027e70adc',
          'job-name': 'pi',
        },
      },
      spec: {
        containers: [
          {
            name: 'pi',
            image: 'perl',
            command: ['perl', '-Mbignum=bpi', '-wle', 'print bpi(2000)'],
            resources: {},
            terminationMessagePath: '/dev/termination-log',
            terminationMessagePolicy: 'File',
            imagePullPolicy: 'Always',
          },
        ],
        restartPolicy: 'Never',
        terminationGracePeriodSeconds: 30,
        dnsPolicy: 'ClusterFirst',
        securityContext: {},
        schedulerName: 'default-scheduler',
      },
    },
  },
  status: {
    conditions: [
      {
        type: 'Complete',
        status: 'True',
        lastProbeTime: '2018-12-03T16:24:36Z',
        lastTransitionTime: '2018-12-03T16:24:36Z',
      },
    ],
    startTime: '2018-12-03T16:24:29Z',
    completionTime: '2018-12-03T16:24:36Z',
    succeeded: 1,
  },
}
