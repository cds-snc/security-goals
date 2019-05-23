/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/core";
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
  keyDownSingleRelease,
  keyDownDetails,
  urlCheck,
  detailsPage,
  tab
}) => {
  var formattedDate = formatTimestamp(timestamp);
  var controlStatus = status === "true" ? "passed" : "failed";
  return (
    <li
      data-testid="control-box"
      name="control-box"
      css={style}
      aria-label={
        detailsPage
          ? "click or press 'Enter' on the link to navigate to the control reference."
          : `has ${controlStatus}. Description of check: ${description}, ${formattedDate}`
      }
    >
      <WithLink keyDownSingleRelease={keyDownSingleRelease} id={id} link={link}>
        <div onKeyDown={keyDownDetails} name="control-inner-container">
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
            urlCheck={urlCheck}
            component={component}
            titleTimestamp={titleTimestamp}
            status={status}
          />
        </div>
      </WithLink>
    </li>
  );
};
