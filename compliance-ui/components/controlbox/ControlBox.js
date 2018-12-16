import { Header } from "./Header";
import { Footer } from "./Footer";
import { WithLink } from "./WithLink";

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
            timestamp={timestamp}
            titleTimestamp={titleTimestamp}
          />
          <Footer
            status={status}
            description={description}
            timestamp={timestamp}
            references={references}
            component={component}
            titleTimestamp={titleTimestamp}
          />
        </div>
      </WithLink>
    </li>
  );
};
