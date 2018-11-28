import { css } from "emotion";
import { theme, mediaQuery } from "../styles";

const passingCircle = css`
  height: 0.3em;
  width: 0.3em;
  background: ${theme.colour.greenDark};
  border-radius: 50%;

  ${mediaQuery.sm(css`
    display: none;
  `)};
`;

const failingCircle = css`
  height: 0.3em;
  width: 0.3em;
  background: ${theme.colour.redDark};
  border-radius: 50%;

  ${mediaQuery.sm(css`
    display: none;
  `)};
`;

const timeStamp = css`
  display: flex;
  align-items: center;
`;

export const Timestamp = ({ status, timestamp }) => {
  const circleCheck = status ? passingCircle : failingCircle;
  return (
    <div name="timestamp" className={timeStamp}>
      <div className={circleCheck} />
      <p>{timestamp}</p>
    </div>
  );
};
