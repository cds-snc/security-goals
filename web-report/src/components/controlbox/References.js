/** @jsx jsx */
import { jsx, css } from "@emotion/core";
const references = css`
  a {
    text-decoration: underline;
    padding: 2px;
  }
`;

/* const splitOutFileName = url => {
  const arr = new URL(url).pathname.split("/");
  if (!arr) {
    url = "#";
  }
  return `${arr[arr.length - 1]}`;
}; */

export const References = ({
  text = "",
  urlCheck,
  timestamp,
  description,
  component,
  status
}) => {
  if (!text) return null;

  function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/;
    return regexp.test(s);
  }

  var passing = "Verification passed:";
  if (status === "false") {
    passing = "Verification failed:";
  }
  return (
    <p data-testid="references" css={references}>
      <strong>Reference(s): </strong>
      <a
        aria-label={`${passing} ${timestamp}, description of check: ${description}, verification reference: ${text}, component category: ${component}`}
        tabIndex="-1"
        data-testid="references-link"
        name="ref-link"
        href={isUrl(text) === true ? text : "#"}
        target={isUrl(text) === true ? "_blank" : "_self"}
      >
        {text}
      </a>
    </p>
  );
};
