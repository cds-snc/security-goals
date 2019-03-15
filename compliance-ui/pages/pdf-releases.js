import { css } from "react-emotion";
import { chunkArray, getReleases, formatTimestamp } from "../util";
import { PageHead, Failed } from "../components";
import { theme } from "../components/styles";
import { Logo } from "../components/Logo";
import Link from "next/link";

const releaseBoxPassing = css`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colour.white};

  p {
    margin: 0;
    font-size: ${theme.font.sm};
    color: ${theme.colour.blackLight};
    font-weight: 700;
  }

  div[name="inner-container"] {
    display: flex;
    font-size: ${theme.font.lg};
    color: ${theme.colour.black};
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const releaseBoxFailing = css`
  ${releaseBoxPassing};
`;

const passingText = css`
  color: ${theme.colour.white};
  background: ${theme.colour.greenDark};
  margin-left: ${theme.spacing.sm};
  padding: ${theme.spacing.xs};
  font-size: ${theme.font.sm};
  border-radius: 5px;
`;

const failingText = css`
${passingText}
  background: ${theme.colour.redDark};

`;

const releaseFocusPassing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.greenDark};
  }
`;

const releaseFocusFailing = css`
  text-decoration: none;

  div:focus {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.redDark};
  }
`;

const releaseTitlePassing = css`
  width: 40rem;

  h3[name="releasebox-title"] {
    font-size: ${theme.font.lg};
    margin: 0 0 ${theme.spacing.sm} 0;
  }

  h3[name="releasebox-title"] span {
    font-size: ${theme.font.lg};
    color: ${theme.colour.greenDark};
  }
`;

const releaseTitleFailing = css`
  ${releaseTitlePassing}

  h3[name="releasebox-title"] span {
    color: ${theme.colour.redDark};
  }
`;
const releaseBadges = css`
  width: 15rem;
  font-weight: 700;
  text-align: right;
`;

const bar = css`
  padding: ${theme.spacing.md} ${theme.spacing.xxl} ${theme.spacing.md}
    ${theme.spacing.xxl};
  width: 100%;
  background: ${theme.colour.blackLight};
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const h1 = css`
  font-size: ${theme.font.xl};
  line-height: 2.8rem;
  font-weight: 650;
  color: ${theme.colour.white};
  margin: 0;
`;

const logo = css`
  width: 3.75rem;
  height: 3.75rem;
  padding-top: 0.15rem;
`;

const page = css`
  width: 8.5in;
  height: 10.5in;
  page-break-after: always;

  h1 {
    margin-top: ${theme.spacing.lg};
    margin-left: ${theme.spacing.xxl};
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.font.xl};
  }
`;

const pdfContainer = css`
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    margin-left: ${theme.spacing.xxl};
    width: 40.8rem;
    border: 1px solid ${theme.colour.grayOutline};
    margin-bottom: 8px;
  }
`;

const number = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.xl};
`;

const Page = ({ children }) => {
  return <div className={page}>{children}</div>;
};

/* https://medium.com/@raphaelstbler/advanced-pdf-generation-for-node-js-using-puppeteer-e168253e159c */
const PdfReleasesPage = ({ err, data, perPage, summary = false }) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.releases) {
    return <Failed />;
  }

  /* SORTING THE DATA INTO A NEW ARRAY */

  let sortedData = [];

  /* STARTING WITH MAPPING THROUGH THE FAILED DATA */

  data.releases.map(release => {
    if (release.passed === "false") {
      sortedData.push({
        release: `${release.release}`,
        timestamp: `${release.timestamp}`,
        passed: `${release.passed}`,
        passing: `${release.passing}`,
        total: `${release.total}`
      });
    }
  });

  /* AND THEN MAPPING THROUGH THE PASSED DATA */

  data.releases.map(release => {
    if (release.passed === "true") {
      sortedData.push({
        release: `${release.release}`,
        timestamp: `${release.timestamp}`,
        passed: `${release.passed}`,
        passing: `${release.passing}`,
        total: `${release.total}`
      });
    }
  });

  const chunks = chunkArray(sortedData, perPage);
  var pageNumber = 0;

  return (
    <React.Fragment>
      {chunks.map(chunk => {
        pageNumber++;
        return (
          <div key={pageNumber} className={pdfContainer}>
            <header data-testid="header" name="header" className={bar}>
              <h1 data-testid="main-header-h1" className={h1}>
                Are we compliant yet?
              </h1>
              <Logo alt="CDS Logo" style={logo} />
            </header>
            <div className={page}>
              <PageHead title="PDF - Releases" />
              <Page key="0">
                <h1 data-testid="pdf-latest-releases">Latest Releases:</h1>
                <ul data-testid="pdf-control-list">
                  {chunk.map((singleRelease, index) => {
                    var myDate = Number(singleRelease.timestamp);
                    var formattedDate = formatTimestamp(myDate);
                    const key = `${singleRelease.release}`;
                    return (
                      <li data-testid="pdf-release-box-li" key={index}>
                        <Link
                          as={`/singlerelease/${key}`}
                          href={`/singlerelease/${key}`}
                        >
                          <a
                            tabIndex="-1"
                            className={
                              singleRelease.passed === "true"
                                ? releaseFocusPassing
                                : releaseFocusFailing
                            }
                          >
                            <div
                              name="release-box"
                              tabIndex="0"
                              className={
                                singleRelease.passed === "true"
                                  ? releaseBoxPassing
                                  : releaseBoxFailing
                              }
                            >
                              <div name="inner-container">
                                <div
                                  className={
                                    singleRelease.passed === "true"
                                      ? releaseTitlePassing
                                      : releaseTitleFailing
                                  }
                                >
                                  <h3 name="releasebox-title">
                                    <span data-testid="pdf-release-title">
                                      {singleRelease.passed === "true"
                                        ? "Passed"
                                        : "Failed"}{" "}
                                      release: #{singleRelease.release}
                                    </span>
                                  </h3>{" "}
                                  <p
                                    data-testid="pdf-release-timestamp"
                                    name="releasebox-timestamp"
                                  >
                                    {formattedDate}
                                  </p>
                                </div>
                                <div
                                  name="release-badges"
                                  className={releaseBadges}
                                >
                                  <span
                                    data-testid="pdf-release-box-passing"
                                    name="releasebox-passing"
                                    className={
                                      singleRelease.passed === "true"
                                        ? passingText
                                        : failingText
                                    }
                                  >
                                    {singleRelease.passing} /{" "}
                                    {singleRelease.total} checks
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className={number}>
                  <span data-testid="page-number">
                    <strong>- Page {pageNumber} -</strong>
                  </span>
                </div>
              </Page>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

PdfReleasesPage.getInitialProps = async ({ req }) => {
  const result = await getReleases();
  return { err: result.err, data: result.data, perPage: 6, summary: false };
};

export default PdfReleasesPage;
