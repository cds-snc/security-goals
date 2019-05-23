//import Link from "next/link";
import React from "react";
import { Link } from "react-router-dom";

const Link = () => {
  return null;
};

export const WithLink = ({ children, id, link, keyDownSingleRelease }) => {
  const url = `/controls/${id}`;
  const label = `Control: ${id}`;
  return link ? (
    <Link
      to={url}
      tabIndex="-1"
      name="control-link"
      onKeyDown={keyDownSingleRelease}
      data-testid="control-box-link"
      aria-label={label}
    >
      {children}
    </Link>
  ) : (
    <div data-testid="with-link-children">{children}</div>
  );
};
