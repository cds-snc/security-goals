/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "../styles";

const container = css`
  display: flex;
  justify-content: center;
`;

const isReadyText = css`
  font-size: ${theme.font.xl};
  color: ${theme.colour.white};
  margin: ${theme.spacing.md} ${theme.spacing.lg};
  font-weight: 650;

  ${mediaQuery.xl(css`
    font-size: ${theme.font.xl};
    margin-left: ${theme.spacing.md};
  `)};

  ${mediaQuery.lg(css`
    font-size: 18pt;
    margin-left: ${theme.spacing.lg};
  `)};

  ${mediaQuery.sm(css`
    font-size: ${theme.font.lg};
    margin-left: ${theme.spacing.md};
  `)};
`;

export const PassFailText = ({ status = { passed: 0, total: -1 } }) => {
  return (
    <div css={container}>
      {status.map(release => {
        return (
          <h2 key="passFail" data-testid="status-text" css={isReadyText}>
            {release.passed === "true"
              ? "All the checks have passed"
              : "Some checks have failed"}
          </h2>
        );
      })}
    </div>
  );
};
