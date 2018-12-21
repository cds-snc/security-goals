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
  description,
  references,
  component,
  titleTimestamp,
  tab
}) => {
  var formattedDate = formatTimestamp(timestamp);
  return (
    <li
      tabIndex={tab}
      data-testid="control-box"
      name="control-box"
      className={style}
    >
      <WithLink tabIndex="0" id={id} link={link}>
        <div>
          <Header
            title={title}
            status={status}
            timestamp={formattedDate}
            titleTimestamp={titleTimestamp}
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
