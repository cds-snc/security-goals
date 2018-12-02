import { withRouter } from "next/router";
import { Grid, Failed, Spinner, ActionBar } from "./";
import { useState, useEffect } from "react";
import { controlStatus } from "../api";
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
  padding: ${theme.spacing.lg} ${theme.spacing.xxxl} ${theme.spacing.xl}
    ${theme.spacing.xxxl};

  a {
    text-decoration: underline;
  }

  li[name="control-box"]:hover {
    background: white;
  }

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.xl}
      ${theme.spacing.md};
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

  h1[name="verification-h1"] {
    margin-bottom: ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.font.xl};
    margin: 0 0 0 0;
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
  div[name="action-bar"] {
    justify-content: flex-start;
    padding-bottom: ${theme.spacing.lg};
  }

  span,
  a[name="back"] {
    margin-bottom: ${theme.spacing.sm};
  }

  a[name="print-button"] {
    margin-left: ${theme.spacing.xl};
  }

  ${mediaQuery.sm(css`
    svg {
      display: none;
    }

    a[name="print-button"] {
      margin-left: ${theme.spacing.lg};
    }

    span,
    a[name="back"] {
      margin-bottom: 0;
    }

    div[name="action-bar"] {
      padding-top: ${theme.spacing.sm};
    }
  `)};
`;

const actionsBottom = css`
  span {
    padding: ${theme.spacing.md} 0;
  }

  ${mediaQuery.sm(css`
    svg {
      display: none;
    }
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
  const title = name ? `${control} - ${name}` : control;

  return (
    <div>
      <div className={actions}>
        <ActionBar id={id} />
      </div>
      <div className={detailsWrap}>
        <div data-testid="details" className={details}>
          {id && (
            <React.Fragment>
              <h1 name="verification-h1">Verification:</h1>
              <Collapsible
                title={title}
                description={description}
                control={control}
              />
              <section className={history}>
                <h1>History:</h1>
                <Grid tab="0" controls={verificationsData(controlData, {})} />
              </section>
            </React.Fragment>
          )}
          {!id && (
            <div className={controlInfo}>
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div className={actionsBottom}>
        <ActionBar id={id} />
      </div>
    </div>
  );
};

export default withRouter(Details);
