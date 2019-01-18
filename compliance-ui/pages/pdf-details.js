import { css } from "react-emotion";
import {
  chunkArray,
  getAllControlsStatus,
  verificationsData,
  getSingleRelease,
  formatTimestamp
} from "../util";
import { IsReady, PageHead, Failed, PdfSummary } from "../components";
import { theme } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";
import Layout from "../components/Layout";
import { Logo } from "../components/Logo";
import Link from "next/link";
import { ControlBox } from "../components/index";
import { detailStatus } from "../api";

const grid = css`
  display: flex;
  margin: 0 ${theme.spacing.xxl};
  padding: 0;
  li {
    list-style: none;
    padding: ${theme.spacing.lg} ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
    position: static;
    border: 1px solid ${theme.colour.grayOutline};
    background: ${theme.colour.white};
    width: 100%;
  }
`;

const cbContainer = css`
  width: 100%;
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

  h1[name="h1-pdf-details"] {
    font-size: ${theme.font.xl};
    margin-left: ${theme.spacing.xxl};
  }

  h1[name="history-h1"] {
    font-size: ${theme.font.xl};
    margin-left: ${theme.spacing.xxl};
  }

  p[name="pdf-details-description"] {
    margin: 0 ${theme.spacing.xxl} ${theme.spacing.xl} ${theme.spacing.xxl};
    line-height: 1.5;
  }
`;

const pdfContainer = css`
  background: white;
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

const getControlStatus = async control => {
  const result = await detailStatus(decodeURI(control));
  const props = { data: result, err: false, controlParam: control };

  if (result instanceof Error) {
    props.err = result.message;
  }

  return props;
};

/* https://medium.com/@raphaelstbler/advanced-pdf-generation-for-node-js-using-puppeteer-e168253e159c */
const PdfDetailsPage = ({
  err,
  data,
  perPage,
  summary = false,
  controlID,
  titleTimestamp = true,
  link = false,
  tab
}) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.controlReleaseData) {
    return <Failed />;
  }

  let sortedData = [];

  if (data.controlData.length === 0) {
    data.controlData.push({
      id: controlID,
      description:
        "The description seems to be missing. Sorry for the inconvenience, please try back at a later time if you are still looking for more information on the control in question."
    });
  }

  data.controlReleaseData.releases.map(controlRelease => {
    return (
      <React.Fragment>
        {controlRelease.controls.map(control => {
          const controlID = control.control;
          return (
            <React.Fragment>
              {control.verifications.map(checks => {
                if (checks.passed === "false") {
                  sortedData.push({
                    status: checks.passed,
                    references: `${checks.references}`,
                    component: `${checks.component}`,
                    description: `${checks.description}`,
                    timestamp: `${checks.timestamp}`,
                    release: `${checks.release}`,
                    id: `${controlID}`
                  });
                }
              })}

              {control.verifications.map(checks => {
                if (checks.passed === "true") {
                  sortedData.push({
                    status: checks.passed,
                    references: `${checks.references}`,
                    component: `${checks.component}`,
                    description: `${checks.description}`,
                    timestamp: `${checks.timestamp}`,
                    release: `${checks.release}`,
                    id: `${controlID}`
                  });
                }
              })}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  });
  const chunks = chunkArray(sortedData, perPage);
  var pageNumber = 0;
  return (
    <div className={pdfContainer}>
      <PageHead title="PDF - Releases" />

      {chunks.map(chunk => {
        pageNumber++;

        return (
          <Page>
            <header name="header" className={bar}>
              <h1 className={h1}>Are we compliant yet?</h1>
              <Logo alt="CDS Logo" style={logo} />
            </header>
            {/*
                  If control data is missing use default message - START
            */}

            {data.controlData.map(summaryItem => {
              return (
                <React.Fragment>
                  <h1 name="h1-pdf-details">{summaryItem.id} Details:</h1>
                  <p name="pdf-details-description">
                    {summaryItem.description}
                  </p>
                </React.Fragment>
              );
            })}

            <ul name="grid" className={grid} tabIndex="0">
              <div key="cb-container" className={cbContainer}>
                {chunk.map((verifications, index) => {
                  return (
                    <ControlBox
                      key={index}
                      status={verifications.status}
                      tab={tab}
                      id={controlID}
                      references={verifications.references}
                      component={verifications.component}
                      description={verifications.description}
                      titleTimestamp={titleTimestamp}
                      timestamp={verifications.timestamp}
                      link={link}
                    />
                  );
                })}
              </div>
            </ul>
            <div className={number}>
              <span>
                <strong>- Page {pageNumber} -</strong>
              </span>
            </div>
          </Page>
        );
      })}
    </div>
  );
};

PdfDetailsPage.getInitialProps = async ({ req }) => {
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
  const result = await getControlStatus(req.params.control);
  const controlID = req.params.control;

  const data = result.data;
  return {
    err: result.err,
    data,
    perPage: 3,
    summary: false,
    controlID
  };
};

export default PdfDetailsPage;
