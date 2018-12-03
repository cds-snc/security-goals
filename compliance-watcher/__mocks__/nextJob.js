export const nextJob = {
  kind: 'Job',
  apiVersion: 'batch/v1',
  metadata: {
    name: 'pi-symmorfosi-auto-1543516767145',
    namespace: 'symmorfosi-jobs',
    selfLink:
      '/apis/batch/v1/namespaces/symmorfosi-jobs/jobs/pi-symmorfosi-auto-1543516767145',
    uid: '199b41c3-f406-11e8-ad6a-080027e70adc',
    resourceVersion: '44645',
    creationTimestamp: '2018-11-29T18:39:27Z',
    labels: {
      'controller-uid': '199b41c3-f406-11e8-ad6a-080027e70adc',
      'job-name': 'pi-symmorfosi-auto-1543516767145',
    },
    annotations: {
      'kubectl.kubernetes.io/last-applied-configuration':
        '{"apiVersion":"batch/v1","kind":"Job","metadata":{"annotations":{},"name":"pi-symmorfosi-auto-1543516767145","namespace":"symmorfosi-jobs"},"spec":{"backoffLimit":4,"template":{"spec":{"containers":[{"command":["perl","-Mbignum=bpi","-wle","print bpi(2000)"],"image":"perl","env":[{"name":"RELEASE","value":"ABCD"}],"name":"pi"}],"restartPolicy":"Never"}}}}',
    },
  },
  spec: {
    parallelism: 1,
    completions: 1,
    backoffLimit: 4,
    selector: {
      matchLabels: {
        'controller-uid': '199b41c3-f406-11e8-ad6a-080027e70adc',
      },
    },
    template: {
      metadata: {
        creationTimestamp: null,
        labels: {
          'controller-uid': '199b41c3-f406-11e8-ad6a-080027e70adc',
          'job-name': 'pi-symmorfosi-auto-1543516767145',
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
        lastProbeTime: '2018-11-29T18:39:33Z',
        lastTransitionTime: '2018-11-29T18:39:33Z',
      },
    ],
    startTime: '2018-11-29T18:39:27Z',
    completionTime: '2018-11-29T18:39:33Z',
    succeeded: 1,
  },
}
