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

const Grid = ({ controls = { items: [] }, link = false, tab }) => {
  if (!controls.items.length) {
    return <div data-testid="not-found">No Verifications found</div>;
  }

  return (
    <ul name="grid" className={grid} tabIndex="0">
      {controls.items.map((control, index) => {
        const key = `${control.id}-${index}`;
        const check = control.status ? greenBG : redBG;
        return (
          <ControlBox
            tab={tab}
            key={key}
            style={check}
            {...control}
            link={link}
          />
        );
      })}
    </ul>
  );
};

export default Grid;
