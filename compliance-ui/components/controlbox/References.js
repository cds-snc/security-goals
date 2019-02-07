import linkifyUrls from "linkify-urls";
import { css } from "emotion";
import { theme } from "../styles";

const references = css`
  a {
    text-decoration: underline;
    padding: 2px;
  }

  a:focus {
    background: yellow;
    color: ${theme.colour.black};
  }
`;

const splitOutFileName = url => {
  const arr = new URL(url).pathname.split("/");
  if (!arr) {
    return url;
  }
  return `${arr[arr.length - 1]}`;
};

const outputReferences = text => {
  return {
    __html: linkifyUrls(text, {
      attributes: {
        target: "_blank",
        rel: "noopener",
        tabIndex: "-1"
      },
      value: splitOutFileName
    })
  };
};

export const References = ({ text = "" }) => {
  if (!text) return null;
  return (
    <p>
      <strong>Reference(s): </strong>
      <span
        className={references}
        dangerouslySetInnerHTML={outputReferences(text)}
      />
    </p>
  );
};
