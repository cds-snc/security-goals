import { fetchGraphQL } from "./fetchGraphQL";
import {
  allControlsQuery,
  singleReleaseQuery,
  allReleaseQuery,
  detailsQuery
} from "./queries";

export const allControlsStatus = async () => {
  return fetchGraphQL(allControlsQuery());
};

export const controlStatus = async releaseID => {
  const result = await fetchGraphQL(singleReleaseQuery(releaseID));
  return result;
};

export const detailStatus = async controlID => {
  const result = await fetchGraphQL(detailsQuery(controlID));
  return result;
};

export const releaseStatus = async () => {
  const release = await fetchGraphQL(allReleaseQuery());
  return release;
};
