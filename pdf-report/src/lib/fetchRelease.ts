import request = require("graphql-request");

export const fetchControls = async () => {
  const query = `{controls{id name description}}`;
  const controls = await fetch(query);
  if (controls) {
    const controlList: { [key: string]: {name: string, description: string} } = {};
    controls.controls.forEach((c: { [key: string]: string; }) => {
      controlList[c.id] = {name: c.name, description: c.description};
    });
    return controlList;
  } else {
    return false;
  }
};

export const fetchRelease = async (id?: string) => {
  let releaseId = id;
  if (!releaseId) {
    releaseId = await lastReleaseId();
  }
  if (releaseId) {
    const release = releaseData(releaseId);
    return release;
  } else {
    return false;
  }
};

const lastReleaseId = async () => {
  const query = `query{releases{release}}`;
  const releases = await fetch(query);
  if (releases) {
    return releases.releases[0].release;
  } else {
    return false;
  }
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

const fetch = async (query: string): Promise<any> => {
  const endpoint = process.env.API_URL;

  if (!endpoint && String(process.env.NODE_ENV) !== "test") {
    console.warn("No process.env.API_URL passed");
    return false;
  }

  const data = await request.request(endpoint, query).catch((err) => {
    console.error(err.message);
    return false;
  });

  return data;
};
