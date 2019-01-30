import Link from "next/link";

export const WithLink = ({ children, id, link }) => {
  const url = `/controls/${id}`;
  const label = `Control: ${id}`;
  return link ? (
    <Link as={url} href={`/details?control=${id}`}>
      <a data-testid="control-box-link" aria-label={label}>
        {children}
      </a>
    </Link>
  ) : (
    children
  );
};
