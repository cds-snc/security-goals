import { format, parse } from "date-fns";
import { allControlsStatus, controlStatus } from "../api";
import { fetchGraphQL } from "../api/fetchGraphQL";

export const verificationsData = (data = false, overrides = {}) => {
  let result = { items: [] };

  if (!data || !data.control || !data.control.verifications) return result;
  result.items = data.control.verifications.map(item => {
    return {
      id: data.control.id,
      name: data.control.name,
      status: item.passed == "true", // eslint-disable-line eqeqeq
      ...item,
      timestamp: formatTimestamp(item.timestamp),
      ...overrides
    };
  });

  return result;
};

const sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const sortByStatusAndTimestamp = (item, status) => {
  let sorted = item.verifications;

  sorted = sorted.filter(item => {
    return (item.passed == "true") === status; // eslint-disable-line eqeqeq
  });

  return sortByKey(sorted, "timestamp").reverse();
};

export const formatTimestamp = timestamp => {
  return format(parse(timestamp), "YYYY-MM-DD HH:mm:ss A");
};

const controlToVerification = (data, overrides = {}) => {
  let items = [];

  if (data) {
    items = data.map(item => {
      const sorted = sortByStatusAndTimestamp(item, overrides.status);
      const target = sorted[0];

      return {
        ...item,
        description: target.description,
        timestamp: formatTimestamp(target.timestamp),
        component: target.component,
        ...overrides
      };
    });
  }

  return items;
};

export const passFailData = async data => {
  let failedItems = controlToVerification(data.failedControls, {
    status: false,
    component: null
  });
  let passedItems = controlToVerification(data.verifiedControls, {
    status: true,
    component: null
  });

  let result = {};
  result.items = [...failedItems, ...passedItems];
  result.total = [...new Set(result.items.map(item => item.id))].length;
  result.passed = Number(passedItems.length);
  return result;
};

export const chunkArray = (arr, chunkSize) => {
  let index = 0;
  let length = arr.length;
  let tempArray = [];
  let chunk;

  for (index = 0; index < length; index += chunkSize) {
    chunk = arr.slice(index, index + chunkSize);
    tempArray.push(chunk);
  }

  return tempArray;
};

export const fromRouter = (router, prop) => {
  let val = "";
  if (router && router.query && router.query[prop]) {
    val = router.query[prop];
  }
  return val;
};

export const getReleases = async ({ req }) => {
  const query = `query{
    releases {
      release
      timestamp
      passed
      passing
      total
      }
  }`;
  //const release = req.params.release;
  if (!req || !req.params || !req.params.release) {
    return;
  }

  const result = await fetchGraphQL(query);

  const data = result.releases;

  const props = { data, err: false, releaseParam: req.params.release };

  if (result instanceof Error) {
    props.err = result.message;
  }

  return props;
};

export const getControlStatus = async ({ req }) => {
  if (!req || !req.params || !req.params.control) {
    return;
  }

  const control = req.params.control;
  const result = await controlStatus(decodeURI(control));
  const props = { data: result, err: false, controlParam: control };

  if (result instanceof Error) {
    props.err = result.message;
  }

  return props;
};
