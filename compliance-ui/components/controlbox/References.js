import { css } from "emotion";
import { theme } from "../styles";

const references = css`
  a {
    text-decoration: underline;
    padding: 2px;
  }
`;

const splitOutFileName = url => {
  const arr = new URL(url).pathname.split("/");
  if (!arr) {
    url = "#";
  }
  return `${arr[arr.length - 1]}`;
};

export const References = ({
  text = "",
  urlCheck,
  timestamp,
  description,
  component,
  status
}) => {
  if (!text) return null;
  var passing = "Verification passed:";
  if (status === "false") {
    passing = "Verification failed:";
  }
  return (
    <p className={references}>
      <strong>Reference(s): </strong>
      <a
        aria-label={`${passing} ${timestamp}, description of check: ${description}, verification reference: ${text}, component category: ${component}`}
        tabIndex="-1"
        name="ref-link"
        href={urlCheck === true ? text : "#"}
      >
        {text}
      </a>
    </p>
  );
};
