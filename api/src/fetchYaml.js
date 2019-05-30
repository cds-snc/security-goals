/* global fetch */

const YAML = require("yaml");

module.exports.fetchYaml = async baselineURL => {
  if (baselineURL === undefined)
    throw new Error("you must provide a url for the baseline.yaml document");

  let url;
  try {
    url = new URL(baselineURL);
  } catch ({ message }) {
    throw new Error(`"${baselineURL}" is not a valid URL`);
  }

  if (!url.pathname.match(/.yaml$/))
    throw new Error(
      `The URL "${baselineURL}" needs to point to a YAML file (ie, ending in .yaml)`,
    );

  // TODO: is this a url to a yaml or yml file?
  let text;
  try {
    let response = await fetch(baselineURL);
    text = await response.text();
  } catch ({ message }) {
    throw new Error(`Fetching security baseline data failed: ${message}`);
  }

  return YAML.parse(text);
};
