export const sortedData = {
  releases: [
    {
      _id: "5c2e61b6678c7c7e3c9ca165",
      release: "1546522884800",
      timestamp: "1546543542058",
      passed: "false",
      passing: "22",
      total: "28",
      controls: [
        {
          control: "PL-8",
          fileId: "5128cab7-c72c-4d88-bccb-942f8d55a4e7--PL-8",
          verifications: [
            {
              origin: "cdssnc/url-check-compliance:latest",
              timestamp: "2019-01-03T13:41:43Z",
              passed: "false",
              description:
                "The application follows the guidelines laid out in the Information Architecture guide.",
              release: "1546522884800",
              component: "Policy",
              references:
                "https://github.com/cds-snc/compliance-policy-documents/information-architecture.md",
              urlCheck: true
            }
          ]
        }
      ]
    }
  ]
};
