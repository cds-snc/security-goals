/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Description } from "./Description";
import { Timestamp } from "./Timestamp";
import { References } from "./References";
import { ControlComponent } from "./ControlComponent";
import { theme, mediaQuery } from "../styles";

const bottomInfo = css`
  p {
    font-size: ${theme.font.md};
    color: ${theme.colour.blackLight};
    margin-bottom: ${theme.spacing.md};
    margin-left: ${theme.spacing.lg};
    width: 80%;
  }

  a {
    font-size: ${theme.font.md};
    color: ${theme.colour.blackLight};
  }

  ${mediaQuery.sm(css`
    p {
      font-size: ${theme.font.sm};
      width: 85%;
    }

    a {
      font-size: ${theme.font.sm};
    }
  `)};
`;

const bottomMobile = css`
  div p {
    margin-bottom: 0;
    font-weight: 700;
    font-size: ${theme.font.sm};
    color: ${theme.colour.blackLight};
    margin-left: ${theme.spacing.sm};

    ${mediaQuery.sm(css`
      margin-left: 0;
    `)};
  }
`;

export const Footer = ({
  description,
  timestamp,
  titleTimestamp,
  status,
  references,
  component,
  urlCheck
}) => {
  return (
    <div css={bottomInfo}>
      <Description description={description} />
      <References
        timestamp={timestamp}
        description={description}
        component={component}
        text={references}
        status={status}
        urlCheck={urlCheck}
      />
      <div css={bottomMobile} name="bottom-mobile">
        <ControlComponent component={component} />
        {titleTimestamp ? null : (
          <Timestamp status={status} timestamp={timestamp} />
        )}
      </div>
    </div>
  );
};
