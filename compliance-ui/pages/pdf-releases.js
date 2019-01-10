import { css } from "react-emotion";
import {
  getAllControlsStatus,
  getControlStatus,
  verificationsData,
  getReleases,
  formatTimestamp
} from "../util";
import { Grid, IsReady, PageHead, Failed, PdfSummary } from "../components";
import { theme } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";
import Layout from "../components/Layout";
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

const releaseTitle = css`
  width: 40rem;

  h3[name="releasebox-title"] {
    font-size: ${theme.font.lg};
    margin: 0 0 ${theme.spacing.sm} 0;
  }

  h3[name="releasebox-title"] span {
    font-size: ${theme.font.lg};
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
  margin-bottom: ${theme.spacing.xl};
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

  let d = [];
  let i = 1;

  for (i = 0; i < 20; i++) {
    d.push({
      _id: "5c2f934234538c00105a3348",
      release: "1546621753549",
      timestamp: "1546621762448",
      passed: "false",
      passing: "22",
      total: "28"
    });
  }

  /* split up the data to display X boxes per page */
  //data.releases
  const chunkArray = (arr, chunkSize) => {
    let index = 0;
    let length = arr.length;
    let tempArray = [];
    let chunk;

    for (index = 0; index < perPage; index++) {
      chunk = arr.slice(index, index + chunkSize);
      tempArray.push(chunk);
    }
    console.log(tempArray);

    return tempArray;
  };

  const chunks = chunkArray(d, 1);
  return (
    <div className={pdfContainer}>
      <header name="header" className={bar}>
        <h1 className={h1}>Are we compliant yet?</h1>
        <Logo alt="CDS Logo" style={logo} />
      </header>
      <div className={page}>
        <PageHead title="PDF - Releases" />
        {summary}

        <Page key="0">
          <h1>Latest Releases:</h1>
          <ul>
            {chunks.map((chunk, index) => {
              return (
                <React.Fragment key={index}>
                  {chunk.map(singleRelease => {
                    var myDate = Number(singleRelease.timestamp);
                    var formattedDate = formatTimestamp(myDate);
                    const key = `${singleRelease.release}`;

                    return (
                      <li>
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
                                <div className={releaseTitle}>
                                  <h3 name="releasebox-title">
                                    <span>
                                      {singleRelease.passed === "true"
                                        ? "Passed"
                                        : "Failed"}{" "}
                                      release: #{singleRelease.release}
                                    </span>
                                  </h3>{" "}
                                  <p name="releasebox-timestamp">
                                    {formattedDate}
                                  </p>
                                </div>
                                <div
                                  name="release-badges"
                                  className={releaseBadges}
                                >
                                  <span
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
                </React.Fragment>
              );
            })}
          </ul>
        </Page>
      </div>
    </div>
  );
};

PdfReleasesPage.getInitialProps = async ({ req }) => {
  // request for a single control
  /*if (req.params.control) {
    const d = await getControlStatus({ req });

    if (!d || !d.data) return;

    return {
      data: verificationsData(d.data),
      perPage: 5,
      summary: (
        <Page>
          <PdfSummary data={d.data} />
        </Page>
      )
    };
  }*/

  // request overview
  const result = await getReleases();
  return { err: result.err, data: result.data, perPage: 10, summary: false };
};

export default PdfReleasesPage;
