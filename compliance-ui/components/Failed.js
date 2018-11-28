import { css } from "emotion";
const Failed = () => {
  const center = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 1em;
  `;

  return (
    <div data-testid="api-fail" className={center}>
      ⚠️ Failed to fetch GraphQL API data
    </div>
  );
};

export default Failed;
