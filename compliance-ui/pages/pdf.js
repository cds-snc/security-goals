import { css } from "react-emotion";
import {
  chunkArray,
  getAllControlsStatus,
  getControlStatus,
  verificationsData
} from "../util";
import { Grid, IsReady, PageHead, Failed, PdfSummary } from "../components";
import { theme } from "../components/styles";

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

  if (!data || !data.items) {
    return <Failed />;
  }

  /* split up the data to display X boxes per page */
  const chunks = chunkArray(data.items, perPage);
  return (
    <div>
      <PageHead title="Are we compliant yet?" />
      {summary}

      {chunks.map((chunk, index) => {
        let cData = {};
        cData.items = chunk;
        return (
          <Page key={index}>
            {index === 0 && (
              <div>
                {!summary && (
                  <div>
                    <h2>Are we compliant yet?</h2> <IsReady data={data} />
                  </div>
                )}
              </div>
            )}
            <h1 className={verificationsH1}> Verifications: </h1>
            <Grid controls={cData} />
          </Page>
        );
      })}
    </div>
  );
};

PdfPage.getInitialProps = async ({ req }) => {
  // request for a single control
  if (req.params.control) {
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
  }

  // request overview
  return { ...(await getAllControlsStatus()), perPage: 7 };
};

export default PdfPage;
