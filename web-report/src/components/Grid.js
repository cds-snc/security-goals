/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { ControlBox, I18N } from "./index";
import { theme, mediaQuery } from "./styles";
import { runtimeConfig } from "../config";

const grid = css`
  display: flex;
  flex-wrap: wrap;
  margin: 0 ${theme.spacing.xxl};
  padding: 0;
  li {
    list-style: none;
    position: static;
    border-top: 1px solid ${theme.colour.grayOutline};
    border-left: 1px solid ${theme.colour.grayOutline};
    background: ${theme.colour.white};
    width: 50%;

    ${mediaQuery.lg(css`
      border-right: 1px solid ${theme.colour.grayOutline};
      width: 100%;
    `)};
  }

  li:nth-of-type(2n) {
    border-right: 1px solid ${theme.colour.grayOutline};
  }

  li:last-of-type {
    border-right: 1px solid ${theme.colour.grayOutline};
    border-bottom: 1px solid ${theme.colour.grayOutline};

    ${mediaQuery.lg(css`
      width: 100%;
    `)};
  }

  li:nth-last-of-type(2) {
    border-bottom: 1px solid ${theme.colour.grayOutline};

    ${mediaQuery.lg(css`
      border-bottom: 0;
    `)};
  }
  a {
    text-decoration: none;
    color: ${theme.colour.black};
  }

  ${mediaQuery.lg(css`
    margin: 0 ${theme.spacing.xl} 0 ${theme.spacing.xl};

    li {
      width: 100%;
    }
  `)};
`;

const greenBG = css`
  font-size: ${theme.font.lg};
  overflow: hidden;
  text-align: left;
  cursor: pointer;

  a {
    padding: ${theme.spacing.xl};
  }

  a[name="ref-link"]:focus {
    background: ${theme.colour.greenDark};
    color: ${theme.colour.white};
  }

  a[name="ref-link"]:hover {
    background: ${theme.colour.greenLight};
    color: ${theme.colour.black};
  }

  a[name="release-link"] {
    width: auto;
  }

  p {
    margin: 0 0 ${theme.spacing.md} 1.5em;
    font-size: ${theme.font.md};
    line-height: 1.5;
  }
  &:hover {
    background: ${theme.colour.greenLight};
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

  a {
    padding: ${theme.spacing.xl};
  }

  a[name="ref-link"]:focus {
    background: ${theme.colour.redDark};
    color: ${theme.colour.white};
  }

  a[name="ref-link"]:hover {
    background: ${theme.colour.redLight};
    color: ${theme.colour.black};
  }

  p {
    margin: 0 0 ${theme.spacing.md} 0;
    font-size: ${theme.font.md};
    line-height: 1.5;
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

const errorMessage = css`
  border: 1px solid ${theme.colour.grayOutline};
  background: ${theme.colour.white};
  padding: ${theme.spacing.lg};
`;

export const GridSingleRelease = ({
  releases: releases = [],
  link = false,
  tab,
  keyDownSingleRelease,
  keyDownUL
}) => {
  if (releases.length > 0) {
    return (
      <div>
        {releases.map(item => {
          return (
            <ul
              data-testid="control-list"
              tabIndex="0"
              onKeyDown={keyDownUL}
              aria-label={`This is a list of controls for release #: ${
                item.release
              }, press spacebar to enter the group and use your arrow keys to navigate through the list items`}
              key={item.release}
              name="grid"
              css={grid}
            >
              {item.controls.map(controls => {
                const controlID = controls.control;
                var stop = false;
                return (
                  <React.Fragment key={controlID}>
                    {controls.verifications.map((verifications, index) => {
                      const check =
                        verifications.passed === "true" ? greenBG : redBG;
                      if (verifications.passed === "false" && stop === false) {
                        stop = true;
                        return (
                          <ControlBox
                            keyDownSingleRelease={keyDownSingleRelease}
                            key={index}
                            status={verifications.passed}
                            tab={tab}
                            id={controlID}
                            references={verifications.references}
                            component={verifications.component}
                            style={check}
                            description={verifications.description}
                            title={controls.control}
                            timestamp={verifications.timestamp}
                            link={link}
                          />
                        );
                      }
                    })}
                  </React.Fragment>
                );
              })}

              {item.controls.map(controls => {
                const controlID = controls.control;
                var stop = false;
                return (
                  <React.Fragment key={controlID}>
                    {controls.verifications.map((verifications, index) => {
                      const check =
                        verifications.passed === "true" ? greenBG : redBG;
                      if (verifications.passed === "true" && stop === false) {
                        stop = true;

                        return (
                          <ControlBox
                            keyDownSingleRelease={keyDownSingleRelease}
                            key={index}
                            status={verifications.passed}
                            tab={tab}
                            id={controlID}
                            references={verifications.references}
                            component={verifications.component}
                            style={check}
                            description={verifications.description}
                            title={controls.control}
                            timestamp={verifications.timestamp}
                            link={link}
                          />
                        );
                      }
                    })}
                  </React.Fragment>
                );
              })}
            </ul>
          );
        })}
      </div>
    );
  }
  if (releases.length == 0) {
    return (
      <p css={errorMessage} data-testid="error-message">
        <strong>
          Sorry, something went wrong. No controls could be rendered.
        </strong>
      </p>
    );
  }
};

export const GridDetails = ({
  releases: { releases } = {},
  titleTimestamp,
  titleColour,
  link = false,
  tab,
  controlTitle,
  keyDownDetails,
  keyDownUL,
  detailsPage
}) => {
  if (releases) {
    return (
      <div>
        {releases.map(item => {
          return (
            <React.Fragment key={item.release}>
              <a
                name="release-link"
                data-testid="release-link"
                aria-label={`Heading: release #: ${
                  item.release
                }, click or press 'Enter' to navigate to the release page
            , or tab to view the ${controlTitle} control history for this release`}
                href={`${runtimeConfig.relative_path}/singlerelease/${
                  item.release
                }`}
              >
                <h1 name="history-h1">
                  <I18N t="release" /> {runtimeConfig.app_name} #{item.release.substr(0,4)}
                </h1>
              </a>
              <ul
                data-testid="control-list"
                tabIndex="0"
                onKeyDown={keyDownUL}
                name="grid"
                css={grid}
                aria-label={`${controlTitle} Control list for release #: ${
                  item.release
                }, press spacebar to enter the group and use your arrow keys to navigate through the list items.`}
              >
                {item.controls.map((controls, index) => {
                  const controlID = controls.control;
                  return (
                    <div key={`${cbContainer} - ${index}`} css={cbContainer}>
                      {controls.verifications.map((verifications, index) => {
                        const check =
                          verifications.passed === "true" ? greenBG : redBG;

                          return (
                          <ControlBox
                            key={index}
                            keyDownDetails={keyDownDetails}
                            status={verifications.passed}
                            tab={tab}
                            id={controlID}
                            references={verifications.references}
                            component={verifications.component}
                            style={check}
                            description={verifications.description}
                            title={controls.control}
                            titleColour={titleColour}
                            titleTimestamp={titleTimestamp}
                            timestamp={verifications.timestamp}
                            link={link}
                            urlCheck={verifications.urlCheck}
                            detailsPage={detailsPage}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
  if (!releases) {
    return (
      <p css={errorMessage} data-testid="error-message">
        <strong>
          Sorry, something went wrong. No controls could be rendered.
        </strong>
      </p>
    );
  }
};
