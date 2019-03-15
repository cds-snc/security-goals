export const result = {
  data: {
    controlData: [
      {
        id: "AU-6",
        description:
          "(A) The organization reviews and analyzes information system audit records [Assignment: organization-defined frequency] for indications of [Assignment: organization-defined inappropriate or unusual activity].\n(B) The organization reports findings to [Assignment: organization-defined personnel or roles]."
      }
    ],
    controlReleaseData: {
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
              control: "AU-6",
              fileId: "22ff1134-2d49-46f1-a284-b681ca54ccf5--AU-6",
              verifications: [
                {
                  origin: "cdssnc/url-check-compliance:latest",
                  timestamp: "2019-01-03T13:41:47Z",
                  passed: "false",
                  description:
                    "The organization does audit reports and reviews in line with written policy.",
                  release: "1546522884800",
                  component: "Policy",
                  references:
                    "https://github.com/cds-snc/compliance-policy-documents/audit-review.md"
                }
              ]
            }
          ]
        }
      ]
    }
  }
};
