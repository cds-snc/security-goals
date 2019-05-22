/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Layout from "./Layout";
const Failed = () => {
  const center = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1em;
  `;

  return (
    <Layout>
      <div data-testid="api-fail" className={center}>
        ⚠️ Failed to fetch GraphQL API data
      </div>
    </Layout>
  );
};

export default Failed;
