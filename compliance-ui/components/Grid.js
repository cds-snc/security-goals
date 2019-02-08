import { css } from "emotion";
import { ControlBox } from "./index";
import { theme, mediaQuery } from "./styles";

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

  li:nth-last-child(2) {
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

  p {
    margin: 0 0 ${theme.spacing.md} 0;
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

export const GridSingleRelease = ({
  releases: { releases },
  link = false,
  tab,
  keyDownSingleRelease,
  keyDownUL
}) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <ul
            tabIndex="0"
            onKeyDown={keyDownUL}
            aria-label={`Control list for release #: ${item.release}`}
            key={item.release}
            name="grid"
            className={grid}
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
<<<<<<< HEAD
=======
                          tab={tab}
>>>>>>> Fixes
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
};

export const GridDetails = ({
  releases: { releases },
  titleTimestamp,
  titleColour,
  link = false,
  tab,
  controlTitle,
  keyDownDetails,
  keyDownUL
}) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <React.Fragment key={item.release}>
            <a
              aria-label={`Heading: release #: ${
                item.release
              }, click to navigate to the release page
            , or tab to view the ${controlTitle} control history for this release`}
              href={`/singlerelease/${item.release}`}
            >
              <h1 name="history-h1">Release #{item.release}</h1>
            </a>
            <ul
              tabIndex="0"
              onKeyDown={keyDownUL}
              name="grid"
              className={grid}
              aria-label={`${controlTitle} Control list for release #: ${
                item.release
              }  `}
            >
              {item.controls.map(controls => {
                const controlID = controls.control;
                return (
                  <div key="cb-container" className={cbContainer}>
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
};
