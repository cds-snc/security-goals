const forceBoolean = (val: boolean | string): boolean => {
  return String(val).toLowerCase() == "true";
};

module.exports.forceBoolean = forceBoolean;
