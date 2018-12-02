import React from "react";
import { css } from "emotion";
import { Count, PassFailText } from "../index";
import { theme, roundedEdges, mediaQuery } from "../styles";

const statusBar = css`
  background: ${theme.colour.redDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${theme.spacing.lg} ${theme.spacing.xxl} ${theme.spacing.lg}
    ${theme.spacing.xxl};
  ${roundedEdges};

  ${mediaQuery.xl(css`
    margin: ${theme.spacing.lg} ${theme.spacing.xxl} ${theme.spacing.lg}
      ${theme.spacing.xxl};
  `)};

  ${mediaQuery.lg(css`
    margin: ${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.lg}
      ${theme.spacing.lg};
  `)};
`;

const IsReady = ({ data, statusRef }) => {
  return (
    <div>
      <div className={statusBar} ref={statusRef} tabIndex="0">
        <PassFailText status={data} />
        <Count status={data} />
      </div>
    </div>
  );
};

export default IsReady;
