import { css } from "emotion";

const topPage = css`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

export const BackToTopButton = ({ click }) => {
  return (
    <div className={topPage} onClick={click}>
      <span>Back To Top of Page</span>
    </div>
  );
};
