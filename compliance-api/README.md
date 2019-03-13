# Compliance API

### Purpose

The purpose of this component is to ingress JSON files that describe compliance checks, transform them into a `release` based hierarchy, and serve them up through a GraphQL API.


### Workflow

Compliance check containers deposit JSON formatted compliance check files in a shared directory on the disk. This component watches the directory and when a new file is added, parses the JSON out of the file. The JSON object contains information about what `release` the check pertains to. The component will determine if it already knows about this `release`, and if it does, add the check information to the existing `release`. If the component has never encountered the release before, it will create a new `release`. In either case the data is stored inside a Mongo NoSQL database as a document. This document can then be queried through a GraphQL API.


### Configuration

Coming soon!
