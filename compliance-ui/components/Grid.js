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
    padding: ${theme.spacing.md} ${theme.spacing.lg};
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
    margin: 0 ${theme.spacing.lg} 0 ${theme.spacing.lg};

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
  p {
    margin: 0;
    font-size: ${theme.font.md};
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

const cbContainer = css`
  width: 100%;
`;

export const Grid = ({ releases: { releases }, link = false, tab }) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <ul key={item.release} name="grid" className={grid} tabIndex="0">
            {item.controls.map(controls => {
              const controlID = controls.control;

              const check =
                controls.verifications[0].passed === "true" ? greenBG : redBG;

              return (
                <ControlBox
                  status={controls.verifications[0].passed}
                  tab={tab}
                  id={controlID}
                  style={check}
                  description={controls.verifications[0].description}
                  title={controls.control}
                  timestamp={controls.verifications[0].timestamp}
                  link={link}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export const Grid2 = ({
  releases: { releases },
  titleTimestamp,
  link = false,
  tab
}) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <ul key={item.release} name="grid" className={grid} tabIndex="0">
            {item.controls.map(controls => {
              const controlID = controls.control;
              return (
                <div className={cbContainer}>
                  {controls.verifications.map(verifications => {
                    console.log(verifications);
                    const check =
                      verifications.passed === "true" ? greenBG : redBG;
                    return (
                      <ControlBox
                        status={verifications.passed}
                        tab={tab}
                        id={controlID}
                        references={verifications.references}
                        component={verifications.component}
                        style={check}
                        description={verifications.description}
                        title={controls.control}
                        titleTimestamp={titleTimestamp}
                        timestamp={verifications.timestamp}
                        link={link}
                      />
                    );
                  })}
                </div>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export const Grid3 = ({ releases: { releases }, link = false, tab }) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <ul key={item.release} name="grid" className={grid} tabIndex="0">
            {item.controls.map(controls => {
              console.log(controls);
              const controlID = controls.control;

              const check =
                controls.verifications[0].passed === "true" ? greenBG : redBG;

              return (
                <ControlBox
                  status={controls.verifications[0].passed}
                  tab={tab}
                  id={controlID}
                  style={check}
                  description={controls.verifications[0].description}
                  title={controls.control}
                  timestamp={controls.verifications[0].timestamp}
                  link={link}
                />
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
