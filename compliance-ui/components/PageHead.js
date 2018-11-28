import Head from "next/head";
export const PageHead = ({ title = "Compliance UI" }) => (
  <div data-testid="title" data-title={title}>
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
  </div>
);
