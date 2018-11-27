## URL Check container

The purpose of this container is to check if URL exists, which is specified through the `URL` environment variable. This can be used for things like ensuring static code analysis tools are in a repo. ex. ESLint file present or if a policy document exists. If it does not it will flag the check as false. It will output a JSON file to the `/checks` directory, or whatever is specified in `OUT_PATH` environment variable.

To use the docker container effectively you need to specify the following environmental variables

| VARIABLE    | DEFAULT VALUE       | DESCRIPTION                                                   |
| ----------- | ------------------- | ------------------------------------------------------------- |
| ORIGIN      | Missing origin      | The origin of the check, for example a container name         |
| COMPONENT   | Missing component   | The component the check is running on. Example: "Source code" |
| DESCRIPTION | Missing description | A narrative description of the check run                      |
| OUT_PATH    | "/checks"           | Where the JSON files gets written to                          |
| SATISFIES   | _None_              | A comma delimited string of all the ex: `AU 2, AU 3`          |
| URL         | _None_              | The URL to check                                              |

For example running the docker container with the following command:

```
docker run \
  -e "ORIGIN=cdssnc/url-check-compliance:latest" \
  -e "COMPONENT=Source code" \
  -e "DESCRIPTION=The application uses an ESLint file to do so static code analysis." \
  -e "SATISFIES=SA-11 (1)" \
  -e "URL=https://github.com/cds-snc/vac-benefits-directory/blob/master/.eslintrc.json" \
  cdssnc/url-check-compliance:latest
```

Will write a JSON with a random ID to the `OUT_PATH` or in this case `/checks` directory.

The content of the file should look like the following:

```
{
  "origin":"cdssnc/url-check-compliance:latest",
  "timestamp":"2018-10-25T14:33:26Z",
  "satisfies":[
     "SA-11 (1)"
  ],
  "passed":true,
  "description":"The application uses an ESLint file to do so static code analysis.",
  "component":"Source code",
  "references":"https://github.com/cds-snc/vac-benefits-directory/blob/master/.eslintrc.json"
}
```

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
    -
      image: 'cdssnc/url-check-compliance:latest'
      imagePullPolicy: Always
      name: 'url-check-compliance-sa-11-1'
      env:
        - name: ORIGIN
          value: 'cdssnc/url-check-compliance:latest'
        - name: COMPONENT
          value: 'Source code'
        - name: DESCRIPTION
          value: 'The application uses an ESLint file to do so static code analysis.'
        - name: SATISFIES
          value: 'SA-11 (1)'
        - name: URL
          value: 'https://github.com/cds-snc/mrpinchy-confession-box/blob/master/.eslintrc.json'
      volumeMounts:
        - name: compliance-checks
          mountPath: /checks
  volumes:
    -
      name: compliance-checks
      hostPath:
        path: /checks
```
