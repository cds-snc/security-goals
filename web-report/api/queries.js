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
  releases {
    _id
    release
    timestamp
    passed
    passing
    total
  }
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

const detailsQuery = controlID => {
  return `query{
    controlData: controls(controlId:"${controlID}") {
      id
      description
    }

    passing: controlReleases(id:"${controlID}", verificationStatus: PASSING){
      releases {
        release
        timestamp
        controls {
          verifications {
            origin
            passed
            timestamp
            description
            component
            references
          }
        }
      }
    }

    failing: controlReleases(id:"${controlID}", verificationStatus: FAILING){
      releases {
        release
        timestamp
        controls {
          verifications {
            origin
            passed
            timestamp
            description
            component
            references
          }
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
