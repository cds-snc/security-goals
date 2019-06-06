## Writing a check

Let's look at the pieces we'll need

1. Check definition file (yaml)

This file will define environmental variables and cofuguration to run our check container


2. Check Container

This is a standalone Docker containers that receive input through environmental variables and outputs the results to a JSON file 


3. Checks Directory

This is the directory where the results (JSON file) of the check will be written to.  You will define this path in the check definition file


## Goals for this tutorial

Write a check that will ensure secret scanning is part of your CI pipeline.


The end result of our check will be a JSON file written to a checks directory.


```
{
  "origin":"gcr.io/security-goals/checks/url-exists:latest",
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

## Let's get started


### The check definition file 

We have setup a demo repository [here](https://github.com/cds-snc/security-goals-demo).  

Inside the [manifests checks directory](https://github.com/cds-snc/security-goals-demo/tree/master/manifests/checks) we can see our check definition files.

[Here][https://github.com/cds-snc/security-goals-demo/blob/master/manifests/checks/ia-5-7.yaml] we have a check we've created that looks for a string in a file.

Looks dig into that file.

1. We define the Docker container that will run our check
```
containers:
    - image: "gcr.io/security-goals/checks/url-contains"
```

2. We define a URL / file to visit (main.workflow) and string to look for " seekret-github-action"
```
- name: URL
  value: "https://raw.githubusercontent.com/cds-snc/cra-alpha/master/.github/main.workflow"
- name: NEEDLE
  value: "seekret-github-action"
```

3. We setup several other variables and configuration. Of note we give our check a description and a "SATISFIES" key which can be a string or array.

```
- name: DESCRIPTION
  value: "This applications scans for secrets as part of it's CI pipeline"
- name: SATISFIES
  value: "IA-5 (7)"

```

Please see [How do checks work](https://github.com/cds-snc/security-goals-checks#how-do-checks-work) for full details on the definition file


### The Check Container

In order for our check to run we need to setup a check container.  These containers will run when we trigger a release.

Lets look at the [url-contains](https://github.com/cds-snc/security-goals-checks/tree/master/url-contains) container.

This [particular container](https://github.com/cds-snc/security-goals-checks/blob/master/url-contains/src/url_contains.cr) is written in [crystal](https://crystal-lang.org).  Checks can be written in any language (Rust, Go, Python, JavaScript) etc... 

If you look at the code:

```
url = URI.parse(check["url"]) // parse the url that we have passed in
client = HTTP::Client.new(url.host.to_s, tls: context)
res = client.get(url.full_path) // get the response

// check to see if the string we're looking for exists
if res.status_code < 400
  check["passed"] = res.body.index(check.["needle"]) != nil ? "true" : "false"
end

// if it does write the check file (see format above) to the checks directory /checks
puts check

...
```

The resulting check file should now have a pass or fail result (JSON file) written to a shared checks directory ready to be picked up by our Security Goals watcher scripts.  

### Results

When the watcher picks up our new file it will write the results to the database where the data will be made available in mutiple formats i.e. a GraphQL api.
