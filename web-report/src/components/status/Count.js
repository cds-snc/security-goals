/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
import { theme, mediaQuery } from "../styles";
import { I18N } from "../I18N";

const stats = css`
  display: flex;
  justify-content: center;
  color: ${theme.colour.white};
  font-size: ${theme.font.md};
  margin-right: ${theme.spacing.lg};

  ${mediaQuery.sm(css`
    display: none;
  `)};
`;

const errorMessage = css`
  p {
    color: ${theme.colour.white};
    margin-right: ${theme.spacing.lg};
  }
`;

export const Count = ({ status }) => {
  if (status) {
    return (
      <div css={stats} data-testid="total">
        {status.map(release => {
          return (
            <span key="count">
              {release.passing} of {release.total} <I18N t="passing" />
            </span>
          );
        })}
      </div>
    );
  }

  if (!status) {
    return (
      <div data-testid="error-message" css={errorMessage}>
        <p>Status Counter is missing data.</p>
      </div>
    );
  }
};
