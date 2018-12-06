import { fetchGraphQL } from "./fetchGraphQL";
import { allControlsQuery, controlQuery, allReleaseQuery } from "./queries";

export const allControlsStatus = async () => {
  return fetchGraphQL(allControlsQuery());
};

export const controlStatus = async control => {
  return fetchGraphQL(controlQuery(control));
};

export const releaseStatus = async () => {
  const release = await fetchGraphQL(allReleaseQuery());
  return release;
};
