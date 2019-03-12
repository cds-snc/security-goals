## Pod Check container

The purpose of this check is to see if a pod is running inside a kubernetes cluster.

The following environmental variables are required:

| Name      | Description                                          | Default |
| --------- | ---------------------------------------------------- | ------- |
| NEEDLE    | The name of the pod to search against. ex. 'fluentd' | `""`    |
| SATISFIES | The controls this check satisfies ex. 'AB-12'        | `""`    |

The following environmental variables are optional:
| Name | Description | Default
|---|---|---
| COMPONENT | The component of the application this check refers to ex. `Source code` | `"Missing component"`
| DESCRIPTION | A description of what the check does | `"Missing description"`
| ORIGIN | The name of the docker container that ran the check | `"Missing origin"`
| OUT_PATH | The directory the output JSON gets written to | `"/checks/"`

A job might look something like this:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: 'pod-check-compliance'
  namespace: symmorfosi
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - image: 'cdssnc/pod-check-compliance:latest'
          imagePullPolicy: Always
          name: 'pod-check-compliance'
          env:
            - name: ORIGIN
              value: 'cdssnc/pod-check-compliance:latest'
            - name: COMPONENT
              value: 'Cluster'
            - name: DESCRIPTION
              value: 'The application uses FluentD inside the cluster to do logging.'
            - name: SATISFIES
              value: 'AB-12'
            - name: NEEDLE
              value: 'fluentd'
          volumeMounts:
            - name: compliance-checks
              mountPath: /checks
      volumes:
        - name: compliance-checks
          persistentVolumeClaim:
claimName: checks-claim
```
