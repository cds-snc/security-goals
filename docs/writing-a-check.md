## Writing a check

Let's look at the pieces we'll need:

1. **Check definition file** (yaml)

> This file will define environmental variables and configuration needed to run our check container


2. **Check Container**


> This is a standalone Docker container that will receive input through environmental variables and output the results to a JSON file 

3. **Checks Directory**


> This is the directory where the results (JSON file) of the check will be written to.  You will define this path in the check definition file


## What are we checking for?

Let's write a check that will ensure secret scanning is part of your CI pipeline.  The end result of our check will be a JSON file written to a checks directory.


**Sample JSON output** 
```json
{
  "origin":"gcr.io/security-goals/checks/url-exists:latest",
  "timestamp":"2018-10-25T14:33:26Z",
  "satisfies":[
     "IA-5 (7)"
  ],
  "passed":true,
  "description":"This applications scans for secrets as part of it's CI pipeline",
  "component":"Source code",
  "references":"https://raw.githubusercontent.com/cds-snc/cra-alpha/master/.github/main.workflow",
  "release":"abcd-1234"
}
```

## Getting started

### 1. The check definition file 

We have setup a [demo repository](https://github.com/cds-snc/security-goals-demo). Inside the [manifests checks directory](https://github.com/cds-snc/security-goals-demo/tree/master/manifests/checks) we can see a list of check definition files.  We'll look at the [ia-5-7.yaml](https://github.com/cds-snc/security-goals-demo/blob/master/manifests/checks/ia-5-7.yaml) file where we have a check that looks for a string in the file we define.

1. We define the Docker container that will run our check
```
containers:
    - image: "gcr.io/security-goals/checks/url-contains"
```

2. We define a URL / file to visit (main.workflow) and string to look for "seekret-github-action"
```
- name: URL
  value: "https://raw.githubusercontent.com/cds-snc/cra-alpha/master/.github/main.workflow"
- name: NEEDLE
  value: "seekret-github-action"
```

3. We setup several other variables and configuration. Of note we give our check a description and a "SATISFIES" key which can be a string or array

```
- name: DESCRIPTION
  value: "This applications scans for secrets as part of it's CI pipeline"
- name: SATISFIES
  value: "IA-5 (7)"

```

For for full details on the definition file please see:
[How do checks work](https://github.com/cds-snc/security-goals-checks#how-do-checks-work) 


### 2. The Check Container

In order for our check to run we need to setup a check container.  These containers will run when we trigger a release.

Looking at the [url-contains](https://github.com/cds-snc/security-goals-checks/tree/master/url-contains) container we'll see that the [code](https://github.com/cds-snc/security-goals-checks/blob/master/url-contains/src/url_contains.cr) is written in [crystal](https://crystal-lang.org).  

Note: Checks can be written in any language (Rust, Go, Python, JavaScript) etc... 

If you look at the code:

```crystal
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


### 3. Results written to a shared checks directory

The resulting check file from the code above should now have written a pass or fail result (JSON file) to a shared checks directory ready to be picked up by our Security Goals watcher scripts.  

When the watcher picks up our new file it will write the results to the database where the data will be made available in mutiple formats i.e. a GraphQL api.
