## How do checks work

Checks are self container docker containers that receive input through environmental variables and output a data file in JSON format containing information about the check in a prescribed format. This allows checks to be written in any language as all as pretty much most languages can read environmental variables and write output to a file on disk. 

### Input variables
Any check should correctly handle the following environmental variables that will be passed to from the kubernetes config file:

| VARIABLE    |  DESCRIPTION                                                   |
| ----------- |  ------------------------------------------------------------- |
| RELEASE     |  The release this is check is part of                          |
| OUT_PATH    |  The directory the JSON files gets written to                  |

You can also pass additional environmental variables (ex. a generic URL check container could be passed a `URL` variable).

### Output Format
The container should write a JSON file in the following format to the `OUT_PATH` directory. The __name of the file should be a random UUID__ so that is does not confilct with other checks written to the folder. (ex. `b8312b4f-6561-4e26-baa8-2c90e4378949.json`). The file should be fomatted in the followng way:

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
  "references":"https://github.com/cds-snc/vac-benefits-directory/blob/master/.eslintrc.json",
  "release":"abcd-1234"
}
```

where

| KEY    |  DESCRIPTION                                                   |
| ----------- |  ------------------------------------------------------------- |
| origin     |  The name of the docker container that ran the check         |
| timestamp    |  An ISO timestamp of when the check ran                  |
| satisfies | An array of controls that are satisfied by this check |
| passed | A boolean value if the check passed |
| component | An arbitrary string of what part of the product this check introspected|
| references | An arbitrary string that can be used as additional information ex. What URL was checked?|
| release | The releases information that was passed in as an environmental variable to the container |