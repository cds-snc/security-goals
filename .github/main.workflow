workflow "test" {
  resolves = [
    "test api",
    "test notifier",
    "test performance-index",
    "test pdf-report",
    "test runner",
    "test web-report"
  ]
  on = "push"
}

action "install api" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd api install"
}

action "test api" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install api"]
  args = "--cwd api test"
}

action "install notifier" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd notifier install"
}

action "test notifier" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install notifier"]
  args = "--cwd notifier test"
}

action "install pdf-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd pdf-report install"
}

action "test pdf-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install pdf-report"]
  args = "--cwd pdf-report test"
}

action "install runner" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd runner install"
}

action "test runner" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install runner"]
  args = "--cwd runner test"
}

action "install web-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd web-report install"
}

action "test web-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install web-report"]
  args = "--cwd web-report test"
  env = {
    CI = "true"
  }
}

action "install performance-index" {
  uses = "docker://culturehq/actions-yarn:latest"
  args = "--cwd performance-index --network-timeout 100000 install"
}

action "test performance-index" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install performance-index"]
  args = "--cwd performance-index test"
  env = {
    CI = "true"
  }
}
