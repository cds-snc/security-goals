export const data = {
  releases: [
    {
      release: "1546522884800",
      timestamp: "1546543542058",
      passed: "false",
      passing: "22",
      total: "28",
      controls: [
        {
          control: "AU-6",
          fileId: "22ff1134-2d49-46f1-a284-b681ca54ccf5--AU-6",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:47Z",
              passed: "false",
              description:
                "The organization does audit reports and reviews in line with written policy."
            }
          ]
        },
        {
          control: "SI-17",
          fileId: "28e10938-9d78-473d-ae69-57ad5603e823--SI-17",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:54Z",
              passed: "false",
              description: "The application implements the fail-safe policy."
            }
          ]
        },
        {
          control: "IA-5 (7)",
          fileId: "3a2fe166-a126-4484-b8b4-6161f43f2dad--IA-5 (7)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:58Z",
              passed: "true",
              description:
                "The application uses Seekret to scan for keys in the build pipeline."
            }
          ]
        },
        {
          control: "AC-3",
          fileId: "4d1d7fb5-eca1-4624-9cb7-8f62bb60183d--AC-3",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:40Z",
              passed: "true",
              description:
                "The cluster uses appropriate roles to manage API access"
            }
          ]
        },
        {
          control: "AC-6",
          fileId: "4d1d7fb5-eca1-4624-9cb7-8f62bb60183d--AC-6",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:40Z",
              passed: "true",
              description:
                "The cluster uses appropriate roles to manage API access"
            }
          ]
        },
        {
          control: "PL-8",
          fileId: "5128cab7-c72c-4d88-bccb-942f8d55a4e7--PL-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:43Z",
              passed: "false",
              description:
                "The application follows the guidelines laid out in the Information Architecture guide."
            }
          ]
        },
        {
          control: "AC-2",
          fileId: "5b152809-9a9c-42a1-871d-3e6557347431--AC-2",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:57Z",
              passed: "false",
              description:
                "The application follows Account Management policy as laid out in documentation."
            }
          ]
        },
        {
          control: "SC-7",
          fileId: "61837b8f-4f1a-4259-af3a-cb69617a61b1--SC-7",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:32Z",
              passed: "true",
              description:
                "The cluster uses Istio to monitor incoming and outgoing data and encrypt communication between pods."
            }
          ]
        },
        {
          control: "SA-12",
          fileId: "648af3bf-05b3-4003-a66e-c6d8027f1933--SA-12",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:42Z",
              passed: "true",
              description:
                "The cluster uses Kritis to block deployment of vulnerable container images."
            }
          ]
        },
        {
          control: "AU-8",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--AU-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "AU-8 (1)",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--AU-8 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "SI-11",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--SI-11",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            },
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "SC-12",
          fileId: "a315357c-f8d8-432d-a88f-9b8a4ae822e5--SC-12",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:51Z",
              passed: "true",
              description:
                "The application uses symmetric keys to use secrets in the build pipeline."
            }
          ]
        },
        {
          control: "SC-13",
          fileId: "a315357c-f8d8-432d-a88f-9b8a4ae822e5--SC-13",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:51Z",
              passed: "true",
              description:
                "The application uses symmetric keys to use secrets in the build pipeline."
            }
          ]
        },
        {
          control: "CM-8",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-8 (1)",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-8 (4)",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8 (4)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "SA-11",
          fileId: "bd9198e7-03ac-4da5-a807-efccc1bd9f15--SA-11",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            },
            {
              timestamp: "2019-01-03T13:41:29Z",
              passed: "true",
              description:
                "The application uses snyk to detect package vulnerabilities."
            },
            {
              timestamp: "2019-01-03T13:41:45Z",
              passed: "true",
              description:
                "The application uses an ESLint file to do so static code analysis."
            },
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            },
            {
              timestamp: "2019-01-03T13:41:55Z",
              passed: "false",
              description:
                "The application developers follow a security assessment plan."
            }
          ]
        },
        {
          control: "CM-7",
          fileId: "cb19fb45-01d9-41f2-a5d0-13f68407244d--CM-7",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:50Z",
              passed: "true",
              description:
                "The cluster uses pod security policies to restrict ports and user priviliges."
            }
          ]
        },
        {
          control: "CA-2 (2)",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--CA-2 (2)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "RA-5",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--RA-5",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "SA-15 (4)",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--SA-15 (4)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "SA-11 (1)",
          fileId: "e6876905-1a31-4101-96f3-cf945da7b523--SA-11 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:45Z",
              passed: "true",
              description:
                "The application uses an ESLint file to do so static code analysis."
            }
          ]
        },
        {
          control: "CM-2",
          fileId: "ea77912d-4f2e-4efb-8e2d-664ef34a2e63--CM-2",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-6 (1)",
          fileId: "ea77912d-4f2e-4efb-8e2d-664ef34a2e63--CM-6 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "SC-8",
          fileId: "eeda2b56-71d4-4a2e-bb06-21e86e82c358--SC-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:52Z",
              passed: "false",
              description:
                "The application uses a HTTPS endpoint (this is a weak control)"
            }
          ]
        },
        {
          control: "SI-5",
          fileId: "fb5c16eb-b748-4276-a22d-3ae1001dc17d--SI-5",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:29Z",
              passed: "true",
              description:
                "The application uses snyk to detect package vulnerabilities."
            }
          ]
        },
        {
          control: "SI-10",
          fileId: "fde933d9-6378-4358-b2fd-af2ee0496e8b--SI-10",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            }
          ]
        }
      ]
    }
  ]
};

export const passingData = {
  releases: [
    {
      release: "1546522884800",
      timestamp: "1546543542058",
      passed: "true",
      passing: "22",
      total: "28",
      controls: [
        {
          control: "AU-6",
          fileId: "22ff1134-2d49-46f1-a284-b681ca54ccf5--AU-6",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:47Z",
              passed: "false",
              description:
                "The organization does audit reports and reviews in line with written policy."
            }
          ]
        },
        {
          control: "SI-17",
          fileId: "28e10938-9d78-473d-ae69-57ad5603e823--SI-17",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:54Z",
              passed: "false",
              description: "The application implements the fail-safe policy."
            }
          ]
        },
        {
          control: "IA-5 (7)",
          fileId: "3a2fe166-a126-4484-b8b4-6161f43f2dad--IA-5 (7)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:58Z",
              passed: "true",
              description:
                "The application uses Seekret to scan for keys in the build pipeline."
            }
          ]
        },
        {
          control: "AC-3",
          fileId: "4d1d7fb5-eca1-4624-9cb7-8f62bb60183d--AC-3",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:40Z",
              passed: "true",
              description:
                "The cluster uses appropriate roles to manage API access"
            }
          ]
        },
        {
          control: "AC-6",
          fileId: "4d1d7fb5-eca1-4624-9cb7-8f62bb60183d--AC-6",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:40Z",
              passed: "true",
              description:
                "The cluster uses appropriate roles to manage API access"
            }
          ]
        },
        {
          control: "PL-8",
          fileId: "5128cab7-c72c-4d88-bccb-942f8d55a4e7--PL-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:43Z",
              passed: "false",
              description:
                "The application follows the guidelines laid out in the Information Architecture guide."
            }
          ]
        },
        {
          control: "AC-2",
          fileId: "5b152809-9a9c-42a1-871d-3e6557347431--AC-2",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:57Z",
              passed: "false",
              description:
                "The application follows Account Management policy as laid out in documentation."
            }
          ]
        },
        {
          control: "SC-7",
          fileId: "61837b8f-4f1a-4259-af3a-cb69617a61b1--SC-7",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:32Z",
              passed: "true",
              description:
                "The cluster uses Istio to monitor incoming and outgoing data and encrypt communication between pods."
            }
          ]
        },
        {
          control: "SA-12",
          fileId: "648af3bf-05b3-4003-a66e-c6d8027f1933--SA-12",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:42Z",
              passed: "true",
              description:
                "The cluster uses Kritis to block deployment of vulnerable container images."
            }
          ]
        },
        {
          control: "AU-8",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--AU-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "AU-8 (1)",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--AU-8 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "SI-11",
          fileId: "942f6292-f180-4723-ac41-d210cafba820--SI-11",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            },
            {
              timestamp: "2019-01-03T13:41:31Z",
              passed: "true",
              description: "The cluster uses Fluentd for logging."
            }
          ]
        },
        {
          control: "SC-12",
          fileId: "a315357c-f8d8-432d-a88f-9b8a4ae822e5--SC-12",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:51Z",
              passed: "true",
              description:
                "The application uses symmetric keys to use secrets in the build pipeline."
            }
          ]
        },
        {
          control: "SC-13",
          fileId: "a315357c-f8d8-432d-a88f-9b8a4ae822e5--SC-13",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:51Z",
              passed: "true",
              description:
                "The application uses symmetric keys to use secrets in the build pipeline."
            }
          ]
        },
        {
          control: "CM-8",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-8 (1)",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-8 (4)",
          fileId: "ba271a28-dc4e-4aad-a8fa-46333d4fb5dd--CM-8 (4)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            },
            {
              timestamp: "2019-01-03T13:41:36Z",
              passed: "true",
              description:
                "The application uses a packages.json to manage the information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "SA-11",
          fileId: "bd9198e7-03ac-4da5-a807-efccc1bd9f15--SA-11",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            },
            {
              timestamp: "2019-01-03T13:41:29Z",
              passed: "true",
              description:
                "The application uses snyk to detect package vulnerabilities."
            },
            {
              timestamp: "2019-01-03T13:41:45Z",
              passed: "true",
              description:
                "The application uses an ESLint file to do so static code analysis."
            },
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            },
            {
              timestamp: "2019-01-03T13:41:55Z",
              passed: "false",
              description:
                "The application developers follow a security assessment plan."
            }
          ]
        },
        {
          control: "CM-7",
          fileId: "cb19fb45-01d9-41f2-a5d0-13f68407244d--CM-7",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:50Z",
              passed: "true",
              description:
                "The cluster uses pod security policies to restrict ports and user priviliges."
            }
          ]
        },
        {
          control: "CA-2 (2)",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--CA-2 (2)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "RA-5",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--RA-5",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "SA-15 (4)",
          fileId: "dda471ae-1100-4007-925f-d8a3a33e6496--SA-15 (4)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:35Z",
              passed: "true",
              description:
                "The cluster uses Kube hunter for vulnerability scanning."
            }
          ]
        },
        {
          control: "SA-11 (1)",
          fileId: "e6876905-1a31-4101-96f3-cf945da7b523--SA-11 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:45Z",
              passed: "true",
              description:
                "The application uses an ESLint file to do so static code analysis."
            }
          ]
        },
        {
          control: "CM-2",
          fileId: "ea77912d-4f2e-4efb-8e2d-664ef34a2e63--CM-2",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "CM-6 (1)",
          fileId: "ea77912d-4f2e-4efb-8e2d-664ef34a2e63--CM-6 (1)",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:37Z",
              passed: "true",
              description:
                "The application uses kubernetes configuration files to manage its state and information inventory in source control with a log of changes by users."
            }
          ]
        },
        {
          control: "SC-8",
          fileId: "eeda2b56-71d4-4a2e-bb06-21e86e82c358--SC-8",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:52Z",
              passed: "false",
              description:
                "The application uses a HTTPS endpoint (this is a weak control)"
            }
          ]
        },
        {
          control: "SI-5",
          fileId: "fb5c16eb-b748-4276-a22d-3ae1001dc17d--SI-5",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:29Z",
              passed: "true",
              description:
                "The application uses snyk to detect package vulnerabilities."
            }
          ]
        },
        {
          control: "SI-10",
          fileId: "fde933d9-6378-4358-b2fd-af2ee0496e8b--SI-10",
          verifications: [
            {
              timestamp: "2019-01-03T13:41:59Z",
              passed: "true",
              description:
                "The application contains tests to validate inputs and error logging."
            }
          ]
        }
      ]
    }
  ]
};
