const setFields = type => {
  const fields = `${type}{
        id
        name
        description
        verifications {
          timestamp
          origin
          component
          description
          passed
          references
        }
      }`;

  return fields;
};

const allControlsQuery = () => {
  return `query{
        ${setFields("failedControls")}
        ${setFields("verifiedControls")}
       }`;
};

const singleReleaseQuery = releaseID => {
  const query = `query{
    releases(releaseId: "${releaseID}"){
      release
timestamp
passed
passing
total
controls {
  control
  fileId
  verifications {
    timestamp
    passed
    description
  }
}
}
   }`;
  return query;
};

const allReleaseQuery = release => {
  return `query{
    releases {
      release
      timestamp
      passed
      passing
      total
      }
  }`;
};

const detailsQuery = release => {
  return `query{
    controlData: controls {
        id
        description
      }

      releaseData: releases(releaseId: "43c61288-ef33-11e8-908e-06d86cf01138"){
        release
  timestamp
  passed
  passing
  total
  controls {
    control
    fileId
    verifications {
      timestamp
      passed
      description
    }
  }
  }
  }`;
};

module.exports = {
  allControlsQuery,
  singleReleaseQuery,
  allReleaseQuery,
  detailsQuery
};
