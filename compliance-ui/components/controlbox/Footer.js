import { css } from "emotion";
import { Description } from "./Description";
import { Timestamp } from "./Timestamp";
import { References } from "./References";
import { ControlComponent } from "./ControlComponent";
import { theme, mediaQuery } from "../styles";

const bottomInfo = css`
  p {
    font-size: ${theme.font.md};
    margin-bottom: ${theme.spacing.md};
    width: 80%;
  }

  a {
    font-size: ${theme.font.md};
  }

  ${mediaQuery.sm(css`
    p {
      font-size: ${theme.font.sm};
      width: 100%;
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
    margin-left: ${theme.spacing.sm};

    ${mediaQuery.sm(css`
      margin-left: 0;
    `)};
  }
`;

export const Footer = ({
  description,
  timestamp,
  status,
  references,
  component
}) => {
  return (
    <div className={bottomInfo}>
      <Description description={description} />
      <References text={references} />
      <div className={bottomMobile} name="bottom-mobile">
        <ControlComponent component={component} />
        <Timestamp status={status} timestamp={timestamp} />
      </div>
    </div>
  );
};
