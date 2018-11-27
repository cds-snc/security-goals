## Role Check container

The purpose of this container is to check if a specific Cluster role is running in the cluster. It does this by looping over a list of cluster role names and seeing if they equal a `NEEDLE`. It will output a JSON file to the `/checks` directory, or whatever is specified in `OUT_PATH` environment variable.

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
    - image: 'cdssnc/roles-check-compliance:latest'
        imagePullPolicy: Always
        name: 'roles-check-compliance-ac-3'
        env:
          - name: ORIGIN
            value: 'cdssnc/roles-check-compliance:latest'
          - name: COMPONENT
            value: 'Infrastructure'
          - name: DESCRIPTION
            value: 'The cluster has an admin cluster role defined'
          - name: SATISFIES
            value: 'AC-3'
          - name: NEEDLE
            value: 'admin'
      volumeMounts:
        - name: compliance-checks
          mountPath: /checks
  volumes:
    -
      name: compliance-checks
      hostPath:
        path: /checks
```
