import { withRouter } from "next/router";
import { Grid2, Failed, Spinner, ActionBar, BackIcon } from "./";
import { useState, useEffect } from "react";
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
  padding: ${theme.spacing.xl} ${theme.spacing.xxxl} 0 ${theme.spacing.xxxl};
  margin-bottom: ${theme.spacing.xxl};

  a {
    text-decoration: underline;
    color: ${theme.colour.blackLight};
  }

  li[name="control-box"]:hover {
    background: white;
  }

  a[name="back"]:first-of-type {
    margin-bottom: ${theme.spacing.lg};
  }

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
    a {
      margin-top: ${theme.spacing.sm};
    }

    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};

      svg {
        height: 0.4rem;
      }
    }

    p {
      font-size: ${theme.font.sm};
      line-height: 1.3rem;
    }
  `)};
`;

const details = css`
  ul[name="grid"] {
    margin: ${theme.spacing.md} 0 0 0;
    width: 100%;
  }

  h1[name="verification-h1"] {
    font-size: ${theme.font.xl};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colour.blackLight};

    ${mediaQuery.sm(css`
      font-size: ${theme.font.lg};
    `)};
  }

  h1 {
    font-size: ${theme.font.xl};
    margin: 0 0 0 0;
  }

  div[name="timestamp"] p {
    float: left;
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

  div[name="timestamp"] {
    display: inline-block;
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

const history = css`
  margin-bottom: ${theme.spacing.xxl};
  h1[name="history-h1"] {
    font-size: ${theme.font.xl};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colour.blackLight};
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

  ${mediaQuery.lg(css`
    margin-bottom: ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    margin-bottom: ${theme.spacing.lg};

    h1[name="history-h1"] {
      font-size: ${theme.font.lg};
    }

    p[name="desc"] {
      width: 100%;
      line-height: 1.4rem;
    }
  `)};
`;

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

export const Details = ({ data, err, id }) => {
  if (err) {
    return <Failed />;
  }
  return (
    <div data-testid="details" className={details}>
      <div className={detailsWrap}>
        {id && (
          <React.Fragment>
            <a name="back" href="/" className={back}>
              <BackIcon fill={theme.colour.blackLight} />
              Back
            </a>
            <h1 name="verification-h1">Verification:</h1>
            <Collapsible
              title={id}
              description={data.controlData[0].description}
              control={id}
            />

            <Grid2 releases={data.controlReleaseData} titleTimestamp={true} />
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

const missing = (
  <section className={history}>
    <h1 name="history-h1">History:</h1>
    <Grid2 tab="0" controls={verificationsData()} />
  </section>
);

export default withRouter(Details);
