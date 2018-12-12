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
    margin-bottom: -1px;
    border-top: 1px solid ${theme.colour.grayOutline};
    border-bottom: 1px solid ${theme.colour.grayOutline};
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
    margin-bottom: 0;
    width: 50.1%;

    ${mediaQuery.lg(css`
      width: 100%;
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
    outline-offset: -3px;
    outline: 3px solid ${theme.colour.greenDark};

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
    outline-offset: -3px;
    outline: 3px solid ${theme.colour.redDark};

    a:focus {
      outline: none;
    }
  }
`;

const Grid = ({ releases: { releases }, link = false, tab }) => {
  return (
    <div>
      {releases.map(item => {
        return (
          <ul key={item.release} name="grid" className={grid} tabIndex="0">
            {item.controls.map(controls => {
              const controlID = controls.control;
              return (
                <React.Fragment key={controls.control}>
                  {controls.verifications.map(verifications => {
                    const check =
                      verifications.passed === "true" ? greenBG : redBG;

                    return (
                      <ControlBox
                        status={verifications.passed}
                        tab={tab}
                        id={controlID}
                        style={check}
                        description={verifications.description}
                        title={controls.control}
                        timestamp={verifications.timestamp}
                        link={link}
                        key={verifications.timestamp}
                      />
                    );
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

export default Grid;
