import { css } from "emotion";
import { BackIcon, PrintButton } from ".";
import { theme, mediaQuery } from "./styles";

const actions = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaQuery.sm(css`
    a,
    a span {
      font-size: ${theme.font.sm};
    }

    img {
      display: none;
    }

    svg {
      height: 0.4rem;
    }
  `)};
`;

const back = css`
  display: inline-block;
  color: #000;
  font-size: ${theme.font.md};
`;

export const ActionBar = ({ id = "" }) => {
  return (
    <div className={actions}>
      {id && (
        <a href="/" className={back}>
          <BackIcon />
          Back
        </a>
      )}
      <PrintButton id={id} link={`/pdf/${id}`} />
    </div>
  );
};
