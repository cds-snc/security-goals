import nock from "nock";
import { generateReport } from "../../lib/generateReport";

const control = {
  "AC-1": {
    description: "DESC",
    name: "Access Control Policy And Procedures"
  }
};

const release = {
  controls: [
    {
      control: "AC-1",
      verifications: [
        {
          origin: "gcr.io/security-goals/checks/url-exists",
          timestamp: "2019-05-27T00:01:00Z",
          passed: "true",
          description:
            "The application uses an ESLint file to do static code analysis.",
          component: "Source code",
          references:
            "https://github.com/cds-snc/cra-alpha/blob/master/.eslintrc.json"
        }
      ]
    }
  ],
  passed: "false",
  passing: "13",
  release: "2011801ed6bc445e530290ebe9d5774cd542f2f7-1558915258476",
  timestamp: "1558915263402",
  total: "14"
};

test("generateReport creates a PDF report", () => {
  const result = generateReport(release, control);
  expect(result).not.toEqual(false);
});
