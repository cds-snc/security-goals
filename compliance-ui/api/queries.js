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

const controlQuery = control => {
  const type = `control(id: "${control}")`;
  return `query{
      ${setFields(type)}
   }`;
};

module.exports = { allControlsQuery, controlQuery };
