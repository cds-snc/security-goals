/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "./styles";
//import BackToTopButton from "./BackToTopButton";

const actions = css`
  display: flex;
  align-items: center;
  background: ${theme.colour.blackLight};
  padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xxl};

  ${mediaQuery.lg(css`
    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};
  `)};

  ${mediaQuery.md(css`
    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};
  `)};

  ${mediaQuery.sm(css`
    a,
    a span {
      font-size: ${theme.font.sm};
    }

    padding: ${theme.spacing.sm} 0 2rem ${theme.spacing.xl};

    img {
      display: none;
    }

    svg {
      height: 0.4rem;
    }
  `)};
`;

const ActionBar = ({
  click,
  keyDownTop
}) => {
  return (
    <div name="action-bar" css={actions}>
      
    </div>
  );
};

export default ActionBar;
