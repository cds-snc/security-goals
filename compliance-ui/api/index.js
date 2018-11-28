import { fetchGraphQL } from "./fetchGraphQL";
import { allControlsQuery, controlQuery } from "./queries";

export const allControlsStatus = async () => {
  return fetchGraphQL(allControlsQuery());
};

export const controlStatus = async control => {
  return fetchGraphQL(controlQuery(control));
};
