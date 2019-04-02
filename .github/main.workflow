workflow "compliance-api docker build" {
  on = "push"
  resolves = [
    "push compliance-api",
  ]
}

action "compliance-api is master" {
  uses = "actions/bin/filter@3c98a2679187369a2116d4f311568596d3725740"
  args = "branch master"
}

action "compliance-api docker registry" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-api is master"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}

action "compliance-api action" {
  uses = "docker://cdssnc/touched-github-action:latest"
  needs = ["compliance-api docker registry"]
  args = "compliance-api/**"
}

action "build compliance-api" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-api action"]
  args = "build -t cdssnc/compliance-api ./compliance-api"
}

action "push compliance-api" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["build compliance-api"]
  args = "push cdssnc/compliance-api"
}

workflow "compliance-ui docker build" {
  on = "push"
  resolves = [
    "push compliance-ui",
  ]
}

action "compliance-ui is master" {
  uses = "actions/bin/filter@3c98a2679187369a2116d4f311568596d3725740"
  args = "branch master"
}

action "compliance-ui docker registry" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-ui is master"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}

action "compliance-ui action" {
  uses = "docker://cdssnc/touched-github-action:latest"
  needs = ["compliance-ui docker registry"]
  args = "compliance-ui/**"
}

action "build compliance-ui" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-ui action"]
  args = "build -t cdssnc/compliance-ui ./compliance-ui"
}

action "push compliance-ui" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["build compliance-ui"]
  args = "push cdssnc/compliance-ui"
}

workflow "compliance-watcher docker build" {
  on = "push"
  resolves = [
    "push compliance-watcher",
  ]
}

action "compliance-watcher is master" {
  uses = "actions/bin/filter@3c98a2679187369a2116d4f311568596d3725740"
  args = "branch master"
}

action "compliance-watcher docker registry" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-watcher is master"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}

action "compliance-watcher action" {
  uses = "docker://cdssnc/touched-github-action:latest"
  needs = ["compliance-watcher docker registry"]
  args = "compliance-watcher/**"
}

action "build compliance-watcher" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["compliance-watcher action"]
  args = "build -t cdssnc/compliance-watcher ./compliance-watcher"
}

action "push compliance-watcher" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["build compliance-watcher"]
  args = "push cdssnc/compliance-watcher"
}
