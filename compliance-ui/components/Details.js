import { withRouter } from "next/router";
import { Grid2, Failed, Spinner, ActionBar, BackIcon } from "./";
import { useState, useEffect } from "react";
import { verificationsData, fromRouter } from "../util/";
import { css } from "emotion";
import { theme, mediaQuery } from "./styles";
import { Collapsible } from "./Collapsible";

const controlInfo = css`
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  padding: ${theme.spacing.lg};
  line-height: 1.6rem;
  margin-bottom: ${theme.spacing.xl};
  h1 {
    margin-bottom: ${theme.spacing.lg};
    margin-top: 0;
    font-size: ${theme.font.xl};
  }

  ${mediaQuery.sm(css`
    h1 {
      font-size: ${theme.font.lg};
    }
  `)};
`;

const detailsWrap = css`
  min-height: 100%;
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} 0 ${theme.spacing.xxxl};
  margin-bottom: ${theme.spacing.xxl};

  a {
    text-decoration: underline;
    color: ${theme.colour.blackLight};
  }

  li[name="control-box"]:hover {
    background: white;
  }

  a[name="back"]:first-of-type {
    margin-bottom: ${theme.spacing.lg};
  }

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.sm};
    a {
      margin-top: ${theme.spacing.sm};
    }

    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};

      svg {
        height: 0.4rem;
      }
    }

    p {
      font-size: ${theme.font.sm};
      line-height: 1.3rem;
    }
  `)};
`;

const details = css`
  ul[name="grid"] {
    margin: ${theme.spacing.md} 0 0 0;
    width: 100%;
  }

  h1[name="verification-h1"] {
    font-size: ${theme.font.xl};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colour.blackLight};

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
    `)};
  }

  h1[name="history-h1"] {
    font-size: ${theme.font.xl};
    margin-top: ${theme.spacing.xl};
    color: ${theme.colour.blackLight};

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
    `)};
  }

  h1 {
    font-size: ${theme.font.xl};
    margin: 0 0 0 0;
  }

  div[name="timestamp"] p {
    float: left;
    color: #808080;
    font-weight: 700;
  }

  div[name="bottom-mobile"] {
    display: flex;
    justify-content: space-between;

    p {
      margin-bottom: 0;
      width: 60%;
    }

    div p {
      width: 100%;
    }

    ${mediaQuery.md(css`
      display: block;
      p {
        margin-bottom: ${theme.spacing.md};
      }

      div p {
        margin-bottom: 0;
      }
    `)};

    ${mediaQuery.sm(css`
      div p {
        font-size: ${theme.font.xs};
      }
    `)};
  }

  div[name="timestamp"] {
    display: inline-block;
  }

  div[name="timestamp"] div {
    display: none;
  }

  div[name="timestamp"] p {
    margin-left: 0;
  }

  li {
    width: 100%;
    cursor: default;
    border-right: 1px solid ${theme.colour.grayOutline};
  }

  li:last-of-type {
    width: 100%;
  }

  li:nth-last-child(2) {
    border-bottom: 0;
  }
`;

const history = css`
  margin-bottom: ${theme.spacing.xxl};
  h1[name="history-h1"] {
    font-size: ${theme.font.xl};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colour.blackLight};
  }

  p[name="desc"] {
    width: 80%;
    line-height: 1.6rem;
  }
  ${mediaQuery.xl(css`
    p[name="desc"] {
      width: 70%;
      line-height: 1.6rem;
    }
  `)};

  ${mediaQuery.lg(css`
    margin-bottom: ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.lg};

    h1[name="history-h1"] {
      font-size: ${theme.font.lg};
    }

    p[name="desc"] {
      width: 100%;
      line-height: 1.4rem;
    }
  `)};
`;

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

export const Details = ({ data, err, id }) => {
  if (err) {
    return <Failed />;
  }

  let mockData = {
    releases: [
      {
        _id: "11111111111111111111",
        release: "11111111",
        timestamp: "1546621762448",
        passed: "false",
        passing: "22",
        total: "28",
        controls: [
          {
            control: "SA-11",
            fileId: "11111111111111111111111111--SA-11",
            verifications: [
              {
                origin: "cdssnc/pod-check-compliance:latest",
                timestamp: "2019-01-04T17:09:26Z",
                passed: "true",
                description:
                  "The cluster uses Kube hunter for vulnerability scanning.",
                release: "11111111",
                component: "Infrastructure",
                references: "kube-hunter"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:55Z",
                passed: "false",
                description:
                  "The application developers follow a security assessment plan.",
                release: "11111111",
                component: "Policy",
                references:
                  "https://github.com/cds-snc/compliance-policy-documents/security-assessment-plan.md"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:37Z",
                passed: "false",
                description:
                  "The application uses an ESLint file to do so static code analysis.",
                release: "11111111",
                component: "Source code",
                references:
                  "https://github.com/cds-snc/mrpinchy-confession-box/blob/master/.eslintrc.json"
              },
              {
                origin: "cdssnc/github-snyk-check-compliance:latest",
                timestamp: "2019-01-04T17:09:19Z",
                passed: "false",
                description:
                  "The application uses snyk to detect package vulnerabilities.",
                release: "11111111",
                component: "Infrastructure",
                references: "https://github.com/cds-snc/mrpinchy-confession-box"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:53Z",
                passed: "true",
                description:
                  "The application contains tests to validate inputs and error logging.",
                release: "11111111",
                component: "Source code",
                references:
                  "https://github.com/cds-snc/mrpinchy-confession-box/blob/master/__tests__/form.test.js"
              }
            ]
          }
        ]
      },
      {
        _id: "22222222222222222222",
        release: "22222222",
        timestamp: "1546621762448",
        passed: "false",
        passing: "22",
        total: "28",
        controls: [
          {
            control: "SA-11",
            fileId: "2222222222222222222222222--SA-11",
            verifications: [
              {
                origin: "cdssnc/pod-check-compliance:latest",
                timestamp: "2019-01-04T17:09:26Z",
                passed: "true",
                description:
                  "The cluster uses Kube hunter for vulnerability scanning.",
                release: "22222222",
                component: "Infrastructure",
                references: "kube-hunter"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:55Z",
                passed: "true",
                description:
                  "The application developers follow a security assessment plan.",
                release: "22222222",
                component: "Policy",
                references:
                  "https://github.com/cds-snc/compliance-policy-documents/security-assessment-plan.md"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:37Z",
                passed: "true",
                description:
                  "The application uses an ESLint file to do so static code analysis.",
                release: "22222222",
                component: "Source code",
                references:
                  "https://github.com/cds-snc/mrpinchy-confession-box/blob/master/.eslintrc.json"
              },
              {
                origin: "cdssnc/github-snyk-check-compliance:latest",
                timestamp: "2019-01-04T17:09:19Z",
                passed: "false",
                description:
                  "The application uses snyk to detect package vulnerabilities.",
                release: "22222222",
                component: "Infrastructure",
                references: "https://github.com/cds-snc/mrpinchy-confession-box"
              },
              {
                origin: "cdssnc/url-check-compliance:latest",
                timestamp: "2019-01-04T17:09:53Z",
                passed: "false",
                description:
                  "The application contains tests to validate inputs and error logging.",
                release: "22222222",
                component: "Source code",
                references:
                  "https://github.com/cds-snc/mrpinchy-confession-box/blob/master/__tests__/form.test.js"
              }
            ]
          }
        ]
      }
    ]
  };

  let sortedData = { releases: [] };

  mockData.releases.map((release, index) => {
    var releaseCounter = index;
    sortedData.releases.push({
      _id: release._id,
      release: release.release,
      timestamp: release.timestamp,
      passed: release.passed,
      passing: release.passing,
      total: release.total,
      controls: []
    });

    release.controls.map((controls, index) => {
      sortedData.releases[releaseCounter].controls.push({
        control: controls.control,
        fileId: controls.fileId,
        verifications: []
      });
    });
  });

  console.log(sortedData.releases);

  return (
    <div data-testid="details" className={details}>
      <div className={detailsWrap}>
        {id && (
          <React.Fragment>
            <a name="back" href="/" className={back}>
              <BackIcon fill={theme.colour.blackLight} />
              Back to home
            </a>
            <h1 name="verification-h1">Verification:</h1>
            <Collapsible
              title={id}
              description={data.controlData}
              control={id}
            />

            <Grid2
              titleColour={true}
              releases={mockData}
              titleTimestamp={true}
            />
          </React.Fragment>
        )}
        {!id && (
          <div className={controlInfo}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

const missing = (
  <section className={history}>
    <h1 name="history-h1">History:</h1>
    <Grid2 tab="0" controls={verificationsData()} />
  </section>
);

export default withRouter(Details);
