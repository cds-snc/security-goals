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

const controlQuery = releaseID => {
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

module.exports = {
  allControlsQuery,
  controlQuery,
  allReleaseQuery
};
