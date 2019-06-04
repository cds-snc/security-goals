const allReleases = () => {
  return `query{ 
    releases{
    timestamp
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
