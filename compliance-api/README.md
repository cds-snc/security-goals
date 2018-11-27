# Compliance API
[![Maintainability](https://api.codeclimate.com/v1/badges/c8db79961efd48fce791/maintainability)](https://codeclimate.com/github/cds-snc/compliance-api/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/cds-snc/compliance-api/badge.svg)](https://snyk.io/test/github/cds-snc/compliance-api)

This is an experiment in exposing compliance data via an API.
The core ideas are:

* No gap between reporting and reality
* Realtime reporting.
* API to enable automation
* API flips responsibility: Ask don't tell.

This project assumes the existence of Kubernetes, an assumption that means that
a large part of the world is introspectable, observable and therefore verifiable in
ways that have not previously been possible.
