import { Header } from "./Header";
import { Footer } from "./Footer";
import { WithLink } from "./WithLink";
import { formatTimestamp } from "../../util";

export const ControlBox = ({
  id,
  title,
  link,
  style,
  status,
  timestamp,
  titleColour,
  description,
  references,
  component,
  titleTimestamp,
  tab
}) => {
  var formattedDate = formatTimestamp(timestamp);
  var controlStatus = status === "true" ? "passed" : "failed";
  return (
    <li
      data-testid="control-box"
      name="control-box"
      className={style}
      tabIndex="-1"
      aria-label={`has ${controlStatus}. Description of check: ${description}, ${formattedDate}`}
    >
      <WithLink tabIndex="0" id={id} link={link}>
        <div name="control-inner-container" tabIndex={tab}>
          <Header
            title={title}
            status={status}
            timestamp={formattedDate}
            titleTimestamp={titleTimestamp}
            titleColour={titleColour}
          />
          <Footer
            status={status}
            description={description}
            timestamp={formattedDate}
            references={references}
            component={component}
            titleTimestamp={titleTimestamp}
          />
        </div>
      </WithLink>
    </li>
  );
};
