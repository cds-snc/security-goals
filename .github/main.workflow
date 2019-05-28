workflow "api" {
  on = "push"
  resolves = [
    "test api"
  ]
}

action "touched api" {
  uses = "docker://cdssnc/touched-github-action:latest"
  args = "api/**"
}

action "install api" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["touched api"]
  args = "--cwd api install"
}

action "test api" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install api"]
  args = "--cwd api test"
}

workflow "notifier" {
  on = "push"
  resolves = [
    "test notifier"
  ]
}

action "touched notifier" {
  uses = "docker://cdssnc/touched-github-action:latest"
  args = "notifier/**"
}

action "install notifier" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["touched notifier"]
  args = "--cwd notifier install"
}

action "test notifier" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install notifier"]
  args = "--cwd notifier test"
}

workflow "pdf-report" {
  on = "push"
  resolves = [
    "test pdf-report"
  ]
}

action "touched pdf-report" {
  uses = "docker://cdssnc/touched-github-action:latest"
  args = "pdf-report/**"
}

action "install pdf-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["touched pdf-report"]
  args = "--cwd pdf-report install"
}

action "test pdf-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install pdf-report"]
  args = "--cwd pdf-report test"
}

workflow "runner" {
  on = "push"
  resolves = [
    "test runner"
  ]
}

action "touched runner" {
  uses = "docker://cdssnc/touched-github-action:latest"
  args = "runner/**"
}

action "install runner" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["touched runner"]
  args = "--cwd runner install"
}

action "test runner" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install runner"]
  args = "--cwd runner test"
}

workflow "web-report" {
  on = "push"
  resolves = [
    "test web-report"
  ]
}

action "touched web-report" {
  uses = "docker://cdssnc/touched-github-action:latest"
  args = "web-report/**"
}

action "install web-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["touched web-report"]
  args = "--cwd web-report install"
}

action "test web-report" {
  uses = "docker://culturehq/actions-yarn:latest"
  needs = ["install web-report"]
  args = "--cwd web-report test"
}

