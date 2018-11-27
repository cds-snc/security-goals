## Pod Check container

The purpose of this container is to check if a specific Pod is running the cluster. It does this by looping over a list of pod names and seeing if they contain a `NEEDLE`. It will output a JSON file to the `/checks` directory, or whatever is specified in `OUT_PATH` environment variable.

To use the docker container effectively you need to specify the following environmental variables

| VARIABLE    | DEFAULT VALUE       | DESCRIPTION                                                   |
| ----------- | ------------------- | ------------------------------------------------------------- |
| ORIGIN      | Missing origin      | The origin of the check, for example a container name         |
| COMPONENT   | Missing component   | The component the check is running on. Example: "Source code" |
| DESCRIPTION | Missing description | A narrative description of the check run                      |
| OUT_PATH    | "/checks"           | Where the JSON files gets written to                          |
| SATISFIES   | _None_              | A comma delimited string of all the ex: `AU 2, AU 3`          |
| NEEDLE      | _None_              | The name of the pod to look for,                              |

IMPORTANT: For this image to work you need to give the `default` user in the `default` namespace permissions to read the pod list. Please check the example YAML files in this repo.

Your Kubernetes init container configuration should look something like this:

```
spec:
  containers:
    -
      image: cdssnc/compliance-api
      imagePullPolicy: Always
      name: compliance-api
      resources: {}
      terminationMessagePath: /dev/termination-log
      terminationMessagePolicy: File
      volumeMounts:
        -
          name: compliance-checks
          mountPath: /checks
  initContainers:
    - image: 'cdssnc/pod-check-compliance:latest'
        imagePullPolicy: Always
        name: 'pod-check-compliance-au-2-apiserver'
        env:
          - name: ORIGIN
            value: 'cdssnc/pod-check-compliance:latest'
          - name: COMPONENT
            value: 'Infrastructure'
          - name: DESCRIPTION
            value: 'The Kubernetes API Server Pod logs all API requests that make infrastructure changes.'
          - name: SATISFIES
            value: 'AU-2'
          - name: NEEDLE
            value: 'kube-apiserver'
      volumeMounts:
        - name: compliance-checks
          mountPath: /checks
  volumes:
    -
      name: compliance-checks
      hostPath:
        path: /checks
```
