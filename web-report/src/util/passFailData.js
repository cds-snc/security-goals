const passFailData = async data => {
  let result = {};
  result.items = [...data.failedControls, ...data.verifiedControls];
  result.total = [...new Set(result.items.map(item => item.id))].length;
  result.passed = Number(data.verifiedControls.length);
  return result;
};

module.exports = { passFailData };
