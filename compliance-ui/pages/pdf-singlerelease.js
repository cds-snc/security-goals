import { css } from "react-emotion";
import {
  chunkArray,
  getAllControlsStatus,
  getControlStatus,
  verificationsData,
  getSingleRelease,
  formatTimestamp
} from "../util";
import { Grid, IsReady, PageHead, Failed, PdfSummary } from "../components";
import { theme } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";
import Layout from "../components/Layout";
import { Logo } from "../components/Logo";
import Link from "next/link";
import { ControlBox } from "../components/index";

const grid = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 ${theme.spacing.xxl};
  padding: 0;
  li {
    list-style: none;
    padding: ${theme.spacing.lg} ${theme.spacing.lg};
    position: static;
    border-top: 1px solid ${theme.colour.grayOutline};
    border-left: 1px solid ${theme.colour.grayOutline};
    background: ${theme.colour.white};
  }

  li:nth-of-type(2n) {
    border-right: 1px solid ${theme.colour.grayOutline};
  }

  li:last-of-type {
    border-right: 1px solid ${theme.colour.grayOutline};
    border-bottom: 1px solid ${theme.colour.grayOutline};
  }

  li:nth-last-child(2) {
    border-bottom: 1px solid ${theme.colour.grayOutline};
  }
  a {
    text-decoration: none;
    color: ${theme.colour.black};
  }
`;

const greenBG = css`
  font-size: ${theme.font.lg};
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  p {
    margin: 0;
    font-size: ${theme.font.md};
  }

  p[name="time"],
  div[name="time-circle"] {
    margin-top: ${theme.spacing.md};
  }

  &:focus-within {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.greenDark};

    a:focus {
      outline: none;
    }
  }
`;

const redBG = css`
  font-size: ${theme.font.lg};
  overflow: hidden;
  text-align: left;
  cursor: pointer;
  p {
    margin: 0;
    font-size: ${theme.font.md};
  }
  &:hover {
    background: ${theme.colour.redLight};
  }

  &:focus-within {
    outline-offset: -4px;
    outline: 4px solid ${theme.colour.redDark};

    a:focus {
      outline: none;
    }
  }
`;

const cbContainer = css`
  width: 100%;
`;

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
  height: 11in;
  page-break-after: always;

  h1 {
    font-size: ${theme.font.xl};
  }
`;

const pdfContainer = css`

background: white;
  ul {
    margin 0;
    padding: 0;
  }

  li {
    list-style: none;
    padding: ${theme.spacing.lg};
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
const PdfSinglePage = ({ err, data, perPage, summary = false }) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.releases) {
    return <Failed />;
  }

  return (
    <div className={pdfContainer}>
      <PageHead title="PDF - Releases" />

      {summary}

      {data.releases.map(item => {
        const chunks = chunkArray(item.controls, perPage);
        var pageNumber = 0;
        return (
          <React.Fragment>
            {chunks.map(chunk => {
              pageNumber++;
              return (
                <Page>
                  <header name="header" className={bar}>
                    <h1 className={h1}>Are we compliant yet?</h1>
                    <Logo alt="CDS Logo" style={logo} />
                  </header>
                  <ul>
                    {chunk.map(singleRelease => {
                      const controlID = singleRelease.control;
                      var stop = false;
                      return (
                        <div>
                          {singleRelease.verifications.map(
                            (verifications, index) => {
                              const check =
                                verifications.passed === "true"
                                  ? greenBG
                                  : redBG;

                              if (
                                verifications.passed === "false" &&
                                stop === false
                              ) {
                                stop = true;

                                return (
                                  <ControlBox
                                    key={index}
                                    status={verifications.passed}
                                    id={controlID}
                                    references={verifications.references}
                                    component={verifications.component}
                                    style={check}
                                    description={verifications.description}
                                    title={controlID}
                                    timestamp={verifications.timestamp}
                                  />
                                );
                              }
                            }
                          )}

                          {singleRelease.verifications.map(
                            (verifications, index) => {
                              const check =
                                verifications.passed === "true"
                                  ? greenBG
                                  : redBG;

                              if (
                                verifications.passed === "true" &&
                                stop === false
                              ) {
                                stop = true;

                                return (
                                  <ControlBox
                                    key={index}
                                    status={verifications.passed}
                                    id={controlID}
                                    references={verifications.references}
                                    component={verifications.component}
                                    style={check}
                                    description={verifications.description}
                                    title={controlID}
                                    timestamp={verifications.timestamp}
                                  />
                                );
                              }
                            }
                          )}
                        </div>
                      );
                    })}
                    <div className={number}>
                      <span>
                        <strong>- Page {pageNumber} -</strong>
                      </span>
                    </div>
                  </ul>
                </Page>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

PdfSinglePage.getInitialProps = async ({ req }) => {
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
  const result = await getSingleRelease();
  return { err: result.err, data: result.data, perPage: 5, summary: false };
};

export default PdfSinglePage;
