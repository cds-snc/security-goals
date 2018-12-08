import { fetchGraphQL } from "./fetchGraphQL";
import { allControlsQuery, controlQuery, allReleaseQuery } from "./queries";

export const allControlsStatus = async () => {
  return fetchGraphQL(allControlsQuery());
};

export const controlStatus = async control => {
  const result = await fetchGraphQL(controlQuery(control));
  return result;
};

export const releaseStatus = async () => {
  const release = await fetchGraphQL(allReleaseQuery());
  return release;
};
