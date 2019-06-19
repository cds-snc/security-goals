import { fetchGraphQL } from "./fetchGraphQL";
import {
  allControlsQuery,
  singleReleaseQuery,
  allReleaseQuery,
  detailsQuery,
  dateFilteredQuery,
  minMaxDatesQuery
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

export const dateFilteredControls = async (startDate, endDate) => {
  return fetchGraphQL(dateFilteredQuery(startDate, endDate));
};

export const minMaxDates = async () => {
  return fetchGraphQL(minMaxDatesQuery());
}