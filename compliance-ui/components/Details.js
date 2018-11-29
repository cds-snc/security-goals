import { withRouter } from "next/router";
import { Grid, Failed, Spinner, MainDescription } from "./";
import ActionBar from "./ActionBar";
import { useState, useEffect } from "react";
import { controlStatus } from "../api";
import { verificationsData, fromRouter } from "../util/";
import { css } from "emotion";
import { theme, mediaQuery } from "./styles";

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

  padding: ${theme.spacing.lg} ${theme.spacing.xxxl};

  a {
    text-decoration: underline;
  }

  li[name="control-box"]:hover {
    background: white;
  }

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.md} ${theme.spacing.xxl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    a {
      margin-top: ${theme.spacing.sm};
    }

    p {
      font-size: ${theme.font.sm};
      line-height: 1.3rem;
    }
  `)};
`;

const details = css`
  ul {
    margin: ${theme.spacing.md} 0 0 0;
    width: 100%;
  }

  div[name="timestamp"] p {
    float: left;
    font-size: ${theme.font.sm};
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
`;

const actions = css`
  margin-bottom: ${theme.spacing.lg};

  ${mediaQuery.lg(css`
    margin-bottom: ${theme.spacing.md};
  `)};
`;

const actionsBottom = css`
  margin: ${theme.spacing.lg} 0;

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.md} 0 ${theme.spacing.md} 0;
  `)};

  ${mediaQuery.sm(css`
    margin: ${theme.spacing.sm} 0 ${theme.spacing.md} 0;
  `)};
`;

const history = css`
  h1 {
    font-size: ${theme.font.xl};
    margin-bottom: ${theme.spacing.sm};
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

  ${mediaQuery.sm(css`
    h1 {
      font-size: ${theme.font.lg};
    }

    p[name="desc"] {
      width: 100%;
      line-height: 1.4rem;
    }
  `)};
`;

export const Details = ({ data, err, router = false }) => {
  const [controlData, setControlData] = useState(data || { control: {} });

  useEffect(async () => {
    if (data) return;
    const result = (data = await controlStatus(control));
    setControlData(result);
  }, controlData);

  if (err) {
    return <Failed />;
  }

  const control = fromRouter(router, "control");
  const { description = "", name = "", id } = controlData.control || {};

  return (
    <div className={detailsWrap}>
      <div data-testid="details" className={details}>
        <div className={actions}>
          <ActionBar id={id} />
        </div>
        {id && (
          <React.Fragment>
            <section className={controlInfo}>
              <h1>
                {`${control}`}
                {name && `- ${name}`}
              </h1>
              <MainDescription description={description} />
            </section>

            <section className={history}>
              <h1>History:</h1>
              <Grid tab="0" controls={verificationsData(controlData, {})} />
            </section>
            <div className={actionsBottom}>
              <ActionBar id={id} />
            </div>
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

export default withRouter(Details);
