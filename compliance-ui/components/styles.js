import { css } from "react-emotion";

/*
  This function is usually for hover events and such
  col: is the color in hex
  amt: is how much you want to darken or lighten, 20 is a good start.
*/

export const breakpoints = {
  xs: 330,
  sm: 575,
  md: 764,
  base: 764,
  lg: 1050,
  xl: 1325
};

export const theme = {
  colour: {
    black: "#000000",
    blackLight: "#262626",
    white: "#fff",
    grayOutline: "#b7b7b7",
    grayLight: "#f0efef",
    redDark: "#CD1D26",
    redLight: "#f8d9dd",
    greenDark: "#258742",
    greenLight: "#e0f0e0",
    focusFill: "#F8F7F7",
    focusOutline: "#ADADAD"
  },
  font: {
    xs: "8pt",
    sm: "10pt",
    base: "12pt",
    md: "12pt",
    lg: "14pt",
    xl: "20pt",
    xxl: "24pt"
  },
  spacing: {
    xxs: "0.17rem",
    xs: "0.33rem",
    sm: "0.5rem",
    md: "1.0rem",
    base: "1.0rem",
    lg: "1.5rem",
    xl: "2.5rem",
    xxl: "5rem",
    xxxl: "12rem"
  }
};

/* eslint-disable security/detect-object-injection */

export const mediaQuery = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    let prefix = typeof breakpoints[label] === "string" ? "" : "max-width:";
    let suffix = typeof breakpoints[label] === "string" ? "" : "px";
    accumulator[label] = cls =>
      css`
        @media screen and (${prefix + breakpoints[label] + suffix}) {
          ${cls};
        }
      `;
    return accumulator;
  },
  {}
);

export const roundedEdges = css`
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;
  border-radius: 0.5rem;
`;

export const passingText = css`
  background: ${theme.colour.greenDark};
  font-size: ${theme.font.md};
  color: ${theme.colour.white};
  padding: ${theme.spacing.xxs} 0 ${theme.spacing.xxs} 0;
  text-align: center;
  height: 1.4rem;
  ${roundedEdges};

  ${mediaQuery.sm(css`
    border-radius: 0.4rem;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
  `)};
`;

export const failingText = css`
  background: ${theme.colour.redDark};
  font-size: ${theme.font.sm};
  padding: ${theme.spacing.xxs} 0 ${theme.spacing.xxs} 0;
  color: ${theme.colour.white};
  text-align: center;
  ${roundedEdges};

  ${mediaQuery.sm(css`
    border-radius: 0.4rem;
    -webkit-border-radius: 0.4rem;
    -moz-border-radius: 0.4rem;
    border-radius: 0.4rem;
  `)};
`;

export const passingFill = css`
  background: ${theme.colour.greenDark};
`;

export const failingFill = css`
  background: ${theme.colour.redDark};
`;

/*
 * Hide only visually, but have it
 * available for screenreaders
 */
export const visuallyhidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: auto;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

export const visuallyhiddenMobile = css`
  ${mediaQuery.sm(css`
    ${visuallyhidden};
  `)};
`;

export const actionsBottom = css`
  margin-top: ${theme.spacing.xl};
  svg {
    fill: ${theme.colour.white};
  }

  span {
    margin: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 0;
    color: ${theme.colour.white};
    text-decoration: underline;
  }

  ${mediaQuery.sm(css`
    a[name="print-button"] {
      display: none;
    }
  `)}
`;
