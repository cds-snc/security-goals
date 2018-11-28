import { Header } from "./Header";
import { Footer } from "./Footer";
import { WithLink } from "./WithLink";

export const ControlBox = ({
  id,
  name,
  link,
  style,
  status,
  timestamp,
  description,
  references,
  component,
  tab
}) => {
  const title = `${id} - ${name}`;
  return (
    <li
      tabIndex={tab}
      data-testid="control-box"
      name="control-box"
      className={style}
    >
      <WithLink tabIndex="0" id={id} link={link}>
        <div>
          <Header title={title} status={status} />
          <Footer
            status={status}
            description={description}
            timestamp={timestamp}
            references={references}
            component={component}
          />
        </div>
      </WithLink>
    </li>
  );
};
