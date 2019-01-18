import { css } from "react-emotion";
import {
  chunkArray,
  getAllControlsStatus,
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
import { detailStatus } from "../api";

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

  p[name="pdf-details-description"] {
    margin: 0 ${theme.spacing.xxl};
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
const PdfDetailsPage = ({ err, data, perPage, summary = false }) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.controlReleaseData) {
    return <Failed />;
  }

  return (
    <div className={pdfContainer}>
      <PageHead title="PDF - Releases" />
      <Page>
        <header name="header" className={bar}>
          <h1 className={h1}>Are we compliant yet?</h1>
          <Logo alt="CDS Logo" style={logo} />
        </header>
        {data.controlData.length === 0 ? (
          <React.Fragment>
            <h1 name="h1-pdf-details">Details:</h1>
            <p name="pdf-details-description">
              The description seems to be missing. Sorry for the inconvenience,
              please try back at a later time if you are still looking for more
              information on the control in question.
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {data.controlData.map(summaryItem => {
              console.log(summaryItem);
              return (
                <React.Fragment>
                  <h1 name="h1-pdf-details">{summaryItem.id} Details:</h1>
                  <p name="pdf-details-description">
                    {summaryItem.description}
                  </p>
                </React.Fragment>
              );
            })}
            ;
          </React.Fragment>
        )}
      </Page>
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

  const data = result.data;
  return {
    err: result.err,
    data,
    perPage: 5,
    summary: false
  };
};

export default PdfDetailsPage;
