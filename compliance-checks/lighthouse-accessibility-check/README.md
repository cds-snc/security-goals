## Lighthouse accessibility check

The purpose of this check is to see generate Lighthouse scores for a specific URL.

The following environmental variables are required:

| Name      | Description                                                          | Default |
| --------- | -------------------------------------------------------------------- | ------- |
| URL       | The full URL of the page you want to run the Lighthouse scan against | `""`    |
| SATISFIES | The controls this check satisfies ex. 'AB-12'                        | `""`    |

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
  name: 'lighthouse-compliance'
  namespace: symmorfosi
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - image: 'cdssnc/lighthouse-compliance:latest'
          imagePullPolicy: Always
          name: 'lighthouse-compliance'
          env:
            - name: ORIGIN
              value: 'cdssnc/lighthouse-compliance:latest'
            - name: COMPONENT
              value: 'Source code'
            - name: DESCRIPTION
              value: 'The application uses Lighthouse to collect Lighthouse score of your website.'
            - name: SATISFIES
              value: 'AB-12'
            - name: URL
              value: 'https://digital.canada.ca'
          volumeMounts:
            - name: compliance-checks
              mountPath: /checks
      volumes:
        - name: compliance-checks
          persistentVolumeClaim:
claimName: checks-claim
```
