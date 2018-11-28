import { css } from "react-emotion";
import { Logo, MainDescription } from "../components";
import { theme } from "./styles";

const header = css`
  h1 {
    color: #000;
    margin: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

const titleHR = css`
  margin-bottom: ${theme.spacing.xl};
`;

const summary = css`
  text-align: left;
  margin: 0.2in 0.5in;
`;

export const PdfSummary = ({ data }) => {
  return (
    <div className={summary}>
      <div className={header}>
        <h1>
          {data.control.id} - {data.control.name}
        </h1>
        <Logo />
      </div>
      <hr className={titleHR} />

      <MainDescription description={data.control.description} />
    </div>
  );
};
