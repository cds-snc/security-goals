import { css } from "react-emotion";
import {
  chunkArray,
  getAllControlsStatus,
  getControlStatus,
  verificationsData,
  getReleases,
  formatTimestamp
} from "../util";
import { Grid, IsReady, PageHead, Failed, PdfSummary } from "../components";
import { theme } from "../components/styles";
import ReleaseBox from "../components/ReleaseBox";

const page = css`
  position: relative;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  margin: 0;
  width: 8.5in;
  height: 11.7in;
  page-break-after: always;
`;

const verificationsH1 = css`
  text-align: left;
  margin-left: ${theme.spacing.lg};
`;

const Page = ({ children }) => {
  return <div className={page}>{children}</div>;
};

/* https://medium.com/@raphaelstbler/advanced-pdf-generation-for-node-js-using-puppeteer-e168253e159c */
const PdfPage = ({ err, data, perPage, summary = false }) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.releases) {
    return <Failed />;
  }

  /* split up the data to display X boxes per page */
  //const chunks = chunkArray(data.releases, perPage);

  return (
    <div>
      <PageHead title="PDF - Details" />
      {summary}

      <Page key="0">
        {data.releases.map((singleRelease, index) => {
          var myDate = Number(singleRelease.timestamp);
          var formattedDate = formatTimestamp(myDate);
          const key = `${singleRelease.release}`;

          return (
            <ReleaseBox
              release={singleRelease.release}
              passed={singleRelease.passed}
              timestamp={formattedDate}
              passing={singleRelease.passing}
              total={singleRelease.total}
              link={`/singlerelease/${key}`}
              key={singleRelease.release}
            />
          );
        })}
      </Page>
    </div>
  );
};

PdfPage.getInitialProps = async ({ req }) => {
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

  //  return { ...(await getAllControlsStatus()), perPage: 7 };
  const result = await getReleases();
  return { err: result.err, data: result.data, perPage: 7, summary: false };
};

export default PdfPage;
