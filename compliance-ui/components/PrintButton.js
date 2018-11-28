import { css } from "emotion";
import { theme } from "./styles";

const print = css`
  color: #000;
  span {
    font-size: ${theme.font.md};
  }

  img {
    height: 1.4rem;
    width: 1.4rem;
    margin-right: ${theme.spacing.sm};
  }

  display: flex;
  align-items: center;
`;

export const PrintButton = ({ link = "", id = "" }) => {
  return (
    <a className={print} href={link}>
      <img alt={`Print ${id}`} src="/static/printer.svg" />
      <span>Print this page (PDF)</span>
    </a>
  );
};
