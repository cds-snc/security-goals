//import Link from "next/link";

const Link = () => {
  return null;
};

export const WithLink = ({ children, id, link, keyDownSingleRelease }) => {
  const url = `/controls/${id}`;
  const label = `Control: ${id}`;
  return link ? (
    <Link as={url} href={`/details?control=${id}`}>
      <a
        tabIndex="-1"
        name="control-link"
        onKeyDown={keyDownSingleRelease}
        data-testid="control-box-link"
        aria-label={label}
      >
        {children}
      </a>
    </Link>
  ) : (
    <div data-testid="with-link-children">{children}</div>
  );
};
