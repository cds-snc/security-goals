const allReleases = () => {
  return `query{ 
    releases{
    timestamp
    releaseTimeStamp
    controls{
      control
      verifications
      {
        passed
      }
    }
  }}`;
};

export default allReleases
