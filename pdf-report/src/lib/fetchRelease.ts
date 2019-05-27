import request = require("graphql-request");

export const fetchControls = async () => {
  const query = `{controls{id name description}}`;
  const controls = await fetch(query);
  const controlList: { [key: string]: {name: string, description: string} } = {};
  controls.controls.forEach((c: { [key: string]: string; }) => {
    controlList[c.id] = {name: c.name, description: c.description};
  });
  return controlList;
};

export const fetchRelease = async (id?: string) => {
  let releaseId = id;
  if (!releaseId) {
    releaseId = await lastReleaseId();
  }
  const release = releaseData(releaseId);
  return release;
};

const lastReleaseId = async () => {
  const query = `query{releases{release}}`;
  const releases = await fetch(query);
  return releases.releases[0].release;
};

const releaseData = async (releaseId: string) => {
  const query =
  `{
    releases(releaseId: "${releaseId}") {
      release
      timestamp
      passed
      passing
      total
      controls {
        control
        verifications {
          origin
          timestamp
          passed
          description
          component
          references
        }
      }
    }
  }`;
  const release = await fetch(query);
  return release.releases[0];
};

const fetch = async (query: string) => {
  const endpoint = process.env.API_URL;

  if (!endpoint && String(process.env.NODE_ENV) !== "test") {
    console.warn("No process.env.API_URL passed");
    return false;
  }

  const data = await request.request(endpoint, query).catch((err) => {
    console.error(err.message);
    return err;
  });

  return data;
};
