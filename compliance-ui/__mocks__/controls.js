export const controls = {
  data: {
    failedControls: [
      {
        id: "AC-2",
        name: "Account Management",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:08Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follow Account Management policy as laid out in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:00Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follows Account Management policy as laid out in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:36:44Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follows Account Management policy as laid out in documentation.",
            passed: "false"
          }
        ]
      },
      {
        id: "AU-6",
        name: "Audit Review, Analysis, And Reporting",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:48Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The organization does audit reports and reviews in line with written policy.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:03Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The organization does audit reports and reviews in line with written policy.",
            passed: "false"
          }
        ]
      },
      {
        id: "CA-8",
        name: "Penetration Testing",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:54Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application undergoes penetration testing as specified in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:17Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application is subject to penetration testing as laid out in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:09Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application undergoes penetration testing as specified in documentation.",
            passed: "false"
          }
        ]
      },
      {
        id: "CA-8 (1)",
        name: "Penetration Testing",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:54Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application undergoes penetration testing as specified in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:17Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application is subject to penetration testing as laid out in documentation.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:09Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application undergoes penetration testing as specified in documentation.",
            passed: "false"
          }
        ]
      },
      {
        id: "PL-8",
        name: "Information Security Architecture",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:02Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follows the guidelines laid out in the Information Architecture guide.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:25Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follows the guidelines laid out in the Information Architecture guide.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:17Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application follows the guidelines laid out in the Information Architecture guide.",
            passed: "false"
          }
        ]
      },
      {
        id: "SA-11",
        name: "Developer Security Testing",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:52Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:06Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:41Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:18Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:24Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:20Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:20Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:27Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:36Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:31Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:23Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:38Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:29Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:04Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:07Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:22Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:08Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:36Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:15Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:31Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:33Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          }
        ]
      },
      {
        id: "SA-11 (4)",
        name: "Developer Security Testing",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:24Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:31Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:08Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          }
        ]
      },
      {
        id: "SA-12",
        name: "Supply Chain Protection",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:27Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kritis to block deployment of vulnerable container images.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:12Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kritis to block deployment of vulnerable container images.",
            passed: "false"
          }
        ]
      },
      {
        id: "SC-7",
        name: "Boundary Protection",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:14Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Istio to monitor incoming and outgoing data and encrypt communication between pods.",
            passed: "false"
          }
        ]
      },
      {
        id: "SI-17",
        name: "Fail-Safe Procedures",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:38Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description: "The application implements the fail-safe policy.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:44Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description: "The application implements the fail-safe policy.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:25Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description: "The application implements the fail-safe policy.",
            passed: "false"
          }
        ]
      }
    ],
    verifiedControls: [
      {
        id: "AU-2",
        name: "Auditable Events",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:46Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:01Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:11Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          }
        ]
      },
      {
        id: "AU-3",
        name: "Content Of Audit Records",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:46Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:01Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:11Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          }
        ]
      },
      {
        id: "AU-3 (1)",
        name: "Content Of Audit Records",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:46Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:01Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The AWS Node Pod logs all API requests that make infrastructure changes.",
            passed: "true"
          }
        ]
      },
      {
        id: "AU-8",
        name: "Time Stamps",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:05Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:13Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:50Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          }
        ]
      },
      {
        id: "AU-8 (1)",
        name: "Time Stamps",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:05Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:13Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:50Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          }
        ]
      },
      {
        id: "CA-2 (2)",
        name: "Security Assessments",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:52Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:07Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:15Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          }
        ]
      },
      {
        id: "CM-2",
        name: "Baseline Configuration",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:21Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:58Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:13Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          }
        ]
      },
      {
        id: "CM-6 (1)",
        name: "Configuration Settings",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:21Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:58Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:13Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          }
        ]
      },
      {
        id: "CM-8",
        name: "Information System Component Inventory",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:19Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:21Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:11Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:58Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:13Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:56Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          }
        ]
      },
      {
        id: "CM-8 (1)",
        name: "Information System Component Inventory",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:19Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:21Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:11Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:58Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:13Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:56Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          }
        ]
      },
      {
        id: "CM-8 (4)",
        name: "Information System Component Inventory",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:19Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:21Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:11Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:58Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:13Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:56Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses a packages.json to manage the information inventory in source control with a log of changes by users.",
            passed: "true"
          }
        ]
      },
      {
        id: "IA-5 (7)",
        name: "Authenticator Management",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:00Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses Seekret to scan for keys in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:16Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses Seekret to scan for keys in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:23Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses Seekret to scan for keys in the build pipeline.",
            passed: "true"
          }
        ]
      },
      {
        id: "RA-5",
        name: "Vulnerability Scanning",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:52Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:07Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:15Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          }
        ]
      },
      {
        id: "SA-11",
        name: "Developer Security Testing",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:52Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:06Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:41Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:18Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:24Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:20Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:20Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:27Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:36Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:31Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T18:37:23Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:38Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:29Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:04Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Policy",
            description:
              "The application developers follow a security assessment plan.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:59:07Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:22Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:08Z",
            origin: "cdssnc/github-reviews-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application performs code review on its pull requests.",
            passed: "false"
          },
          {
            timestamp: "2018-11-16T15:09:36Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:15Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:31Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:33Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          }
        ]
      },
      {
        id: "SA-11 (1)",
        name: "Developer Security Testing",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:06Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:29Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:22Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses an ESLint file to do so static code analysis.",
            passed: "true"
          }
        ]
      },
      {
        id: "SA-15 (4)",
        name: "Development Process, Standards, And Tool",
        verifications: [
          {
            timestamp: "2018-11-16T18:36:52Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:07Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:15Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The cluster uses Kube hunter for vulnerability scanning.",
            passed: "true"
          }
        ]
      },
      {
        id: "SA-22",
        name: "Unsupported System Components",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:18Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:36Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:31Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          }
        ]
      },
      {
        id: "SC-12",
        name: "Cryptographic Key Establishment And Management",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:29Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:16Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:34Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          }
        ]
      },
      {
        id: "SC-13",
        name: "Cryptographic Protection",
        verifications: [
          {
            timestamp: "2018-11-16T15:59:29Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:16Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:34Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application uses symmetric keys to use secrets in the build pipeline.",
            passed: "true"
          }
        ]
      },
      {
        id: "SI-2",
        name: "Flaw Remediation",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:18Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:36Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:31Z",
            origin: "cdssnc/github-issues-check-compliance:latest",
            component: "Infrastructure",
            description:
              "This application uses GitHub issues for flaw remediation.",
            passed: "true"
          }
        ]
      },
      {
        id: "SI-5",
        name: "Security Alerts, Advisories, And Directives",
        verifications: [
          {
            timestamp: "2018-11-16T18:37:20Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:38Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:33Z",
            origin: "cdssnc/github-snyk-check-compliance:latest",
            component: "Infrastructure",
            description:
              "The application uses snyk to detect package vulnerabilities.",
            passed: "true"
          }
        ]
      },
      {
        id: "SI-10",
        name: "Information Input Validation",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:41Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:36Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:23Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          }
        ]
      },
      {
        id: "SI-11",
        name: "Error Handling",
        verifications: [
          {
            timestamp: "2018-11-16T15:09:41Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:36Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:37:23Z",
            origin: "cdssnc/url-check-compliance:latest",
            component: "Source code",
            description:
              "The application contains tests to validate inputs and error logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:59:05Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T15:09:13Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          },
          {
            timestamp: "2018-11-16T18:36:50Z",
            origin: "cdssnc/pod-check-compliance:latest",
            component: "Infrastructure",
            description: "The cluster uses Fluentd for logging.",
            passed: "true"
          }
        ]
      }
    ]
  }
};
