const outputDescription = text => {
  return {
    __html: formatDescription(text)
  };
};

const formatDescription = text => {
  return text.replace(/(?:\r\n|\r|\n)/g, "<br><br>");
};

export const MainDescription = ({ description }) => {
  return (
    <p
      tabIndex="-1"
      id="main-description"
      data-testid="main-description"
      dangerouslySetInnerHTML={outputDescription(description)}
    />
  );
};
