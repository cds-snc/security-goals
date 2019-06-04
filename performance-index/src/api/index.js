import { fetchGraphQL } from "./fetchGraphQL";
import allReleaseQuery from "./queries";

export const allReleases = async () => {
  return fetchGraphQL(allReleaseQuery());
};