## URL Check container

The purpose of this check is to see if a URL returns a 200 response code.

The following environmental variables are required:

| Name      | Description                                                                                          | Default |
| --------- | ---------------------------------------------------------------------------------------------------- | ------- |
| URL       | The URL to check ex. 'https://github.com/cds-snc/symmorfosi/blob/master/compliance-api/.eslintrc.js' | `""`    |
| SATISFIES | The controls this check satisfies ex. 'AB-12'                                                        | `""`    |

The following environmental variables are optional:

| Name        | Description                                                             | Default                 |
| ----------- | ----------------------------------------------------------------------- | ----------------------- |
| COMPONENT   | The component of the application this check refers to ex. `Source code` | `"Missing component"`   |
| DESCRIPTION | A description of what the check does                                    | `"Missing description"` |
| ORIGIN      | The name of the docker container that ran the check                     | `"Missing origin"`      |
| OUT_PATH    | The directory the output JSON gets written to                           | `"/checks/"`            |

A job might look something like this:

```
apiVersion: batch/v1
kind: Job
metadata:
  name: 'url-check-compliance'
  namespace: symmorfosi
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - image: 'cdssnc/url-check-compliance:latest'
          imagePullPolicy: Always
          name: 'url-check-compliance'
          env:
            - name: ORIGIN
              value: 'cdssnc/url-check-compliance:latest'
            - name: COMPONENT
              value: 'Source code'
            - name: DESCRIPTION
              value: 'This application uses a linter.'
            - name: SATISFIES
              value: 'AB-12'
            - name: URL
              value: 'https://github.com/cds-snc/symmorfosi/blob/master/compliance-api/.eslintrc.js'
          volumeMounts:
            - name: compliance-checks
              mountPath: /checks
      volumes:
        - name: compliance-checks
          persistentVolumeClaim:
claimName: checks-claim
```
