import { css } from "emotion";
import { theme } from "./styles";
import { PrinterIcon } from "./";

const print = css`
  color: #fff;
  span {
    font-size: ${theme.font.md};
  }

  svg {
    height: 1.1rem;
    width: 1.1rem;
    margin-right: ${theme.spacing.sm};
  }

  display: flex;
  align-items: center;
`;

export const PrintButton = ({ link = "", id = "" }) => {
  return (
    <a name="print-button" className={print} href={link}>
      <PrinterIcon />
      <span>Print this page (PDF)</span>
    </a>
  );
};
