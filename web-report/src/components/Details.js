/** @jsx jsx */
import React from "react";
import { GridDetails, Spinner, BackIcon } from "./";
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
import { Collapsible } from "./Collapsible";
import { runtimeConfig } from '../config';

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

  a {
    text-decoration: underline;
    color: ${theme.colour.blackLight};
  }
  li[name="control-box"] {
    padding: ${theme.spacing.lg} 0;
  }
  li[name="control-box"]:hover {
    background: white;
  }

  span[name="back-text"] {
    margin-left: ${theme.spacing.xs};
  }

  a[name="back"]:first-of-type {
    margin-bottom: ${theme.spacing.lg};
  }

  a[name="back"]:last-of-type {
    margin-top: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.xxl};
  }

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.xl} ${theme.spacing.xl} ${theme.spacing.xxl}
      ${theme.spacing.xl};

      a[name="back"]:last-of-type {
        margin-bottom: 0;
  `)};

  ${mediaQuery.sm(css`
    padding: ${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.xl}
      ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.sm};
    a {
      margin-top: ${theme.spacing.sm};
    }

    span[name="back-text"] {
      margin-left: -0.7rem;
    }

    a[name="back"]:first-of-type {
      font-size: ${theme.font.sm};

      svg {
        height: 0;
      }
    }

    a[name="back"]:last-of-type {
      font-size: ${theme.font.sm};
      margin-bottom: 0;

      svg {
        height: 0;
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

  div[name="control-inner-container"]:focus {
    outline: none;
  }

  h1[name="history-h1"] {
    display: inline-block;
    text-decoration: underline;
    font-size: ${theme.font.xl};
    margin-top: ${theme.spacing.xl};
    color: ${theme.colour.blackLight};
    width: 100%;
    word-wrap: break-word;

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

    p[name="component"] {
      margin-bottom: 0;
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
    formatTimestamp
    ${mediaQuery.sm(css`
      div p {
        font-size: ${theme.font.xs};
      }

      p {
        width: 85%;
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

  li:nth-last-of-type(2) {
    border-bottom: 0;
  }
`;

const back = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
`;

const backBottom = css`
  display: inline-block;
  color: ${theme.colour.black};
  font-size: ${theme.font.md};
  margin: 0;
`;

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1em;
`;

export const Details = ({ data, sortedData, err, id, keyDownDetails, keyDownUL }) => {
  return (
    <div data-testid="details" css={details}>
      <div css={detailsWrap}>
        {id && (
          <React.Fragment>
            <a data-testid="back-button" name="back" href={`${runtimeConfig.relative_path}/`} css={back}>
              <BackIcon fill={theme.colour.blackLight} />
              <span name="back-text">Back to home</span>
            </a>
            <h1 data-testid="verification-h1" name="verification-h1">
              Verification:
            </h1>
            {data ? (
              <React.Fragment>
                <Collapsible
                  title={id}
                  description={data.controlData}
                  control={id}
                />

                <GridDetails
                  controlTitle={id}
                  titleColour={true}
                  releases={sortedData}
                  titleTimestamp={true}
                  keyDownDetails={keyDownDetails}
                  keyDownUL={keyDownUL}
                  detailsPage={true}
                />
              </React.Fragment>
            ) : null}
            <a
              data-testid="back-button"
              name="back"
              href={`${runtimeConfig.relative_path}/`}
              css={backBottom}
            >
              <BackIcon fill={theme.colour.blackLight} />
              <span name="back-text">Back to home</span>
            </a>
          </React.Fragment>
        )}
        {!id && (
          <div css={controlInfo}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
