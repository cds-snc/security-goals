import { css } from "react-emotion";
import { chunkArray } from "../util";
import { PageHead, Failed, ControlBox } from "../components";
import { theme } from "../components/styles";
import { Logo } from "../components/Logo";
import { controlStatus } from "../api";

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

  h3[name="control-box-title"] {
    margin: 0 0 ${theme.spacing.md} 0;
  }

  div[name="timestamp"] {
    margin:${theme.spacing.md} 0 0 0;
  }
`;

const number = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.xl};
`;

const cbContainer = css`
  h2 {
    margin-left: 0;
  }
`;

const Page = ({ children }) => {
  return <div className={page}>{children}</div>;
};

export const getSingleRelease = async release => {
  const result = await controlStatus(release);
  const props = { err: false, data: result, releaseParam: release };
  if (result instanceof Error) {
    props.err = result.message;
  }
  return props;
};

/* https://medium.com/@raphaelstbler/advanced-pdf-generation-for-node-js-using-puppeteer-e168253e159c */
const PdfSinglePage = ({ err, data, perPage, summary = false }) => {
  if (err) {
    console.log(err);
  }

  if (!data || !data.releases) {
    return <Failed />;
  }

  const sortedData = [];
  /* This entire mapping is used to push the data into a new array sorted
with failed tests taking priority */

  /* STARTING WITH THE FAILED CONTROLS */

  data.releases.map(release => {
    return (
      <React.Fragment key={release.release}>
        {release.controls.map(control => {
          var controlID = control.control;
          var stop = false;
          return (
            <React.Fragment key={control.control}>
              {control.verifications.map(verification => {
                if (verification.passed === "false" && stop === false) {
                  stop = true;
                  sortedData.push({
                    passed: `${verification.passed}`,
                    control: `${controlID}`,
                    description: `${verification.description}`,
                    timestamp: `${verification.timestamp}`
                  });
                }
              })}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  });

  /* THEN THE PASSING CONTROLS */

  data.releases.map(release => {
    return (
      <React.Fragment key={release.release}>
        {release.controls.map(control => {
          var controlID = control.control;
          var stop = false;
          return (
            <React.Fragment key={control.control}>
              {control.verifications.map(verification => {
                if (verification.passed === "true" && stop === false) {
                  stop = true;
                  sortedData.push({
                    passed: `${verification.passed}`,
                    control: `${controlID}`,
                    description: `${verification.description}`,
                    timestamp: `${verification.timestamp}`
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
      {/* NOW WE WILL USE THE SORTED DATA TO CHUNK AND
        RENDER THE COMPONENTS IN THE PDF */}
      {chunks.map(chunk => {
        pageNumber++;
        return (
          <Page key={`page: ${pageNumber}`}>
            <header name="header" className={bar}>
              <h1 className={h1}>Are we compliant yet?</h1>
              <Logo alt="CDS Logo" style={logo} />
            </header>
            <div className={cbContainer}>
              {chunk.map((verifications, index) => {
                const check = verifications.passed === "true" ? greenBG : redBG;
                return (
                  <ControlBox
                    key={index}
                    status={verifications.passed}
                    id={verifications.control}
                    style={check}
                    description={verifications.description}
                    title={verifications.control}
                    timestamp={verifications.timestamp}
                  />
                );
              })}
            </div>
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

PdfSinglePage.getInitialProps = async ({ req }) => {
  const result = await getSingleRelease(req.params.release);
  return { err: result.err, data: result.data, perPage: 5, summary: false };
};

export default PdfSinglePage;
