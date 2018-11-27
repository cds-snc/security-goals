## Purpose

The purpose of this repository is to contain code for generic compliance check containers. For example, a number of the controls required for compliance need to determine if a file exists within a repository (ex. ESLint files) or if they are publicly available (ex. Policy documents). This check can be conducted by ascertaining if a URL exists, which is a generic function. It does not make sense to write a container for each URL check, but rather to reuse the same container than can configure appropriately.

The same assumption can be made about a check for specific pod running in a cluster. Rather than compile a container for each pod check, just pass the pod name as a variable to a generic container.
