import fetch from "isomorphic-fetch";

export const generateReleaseId = async (): Promise<string> => {
  if (process.env.GITHUB_REPO !== undefined) {
    const repo = process.env.GITHUB_REPO;
    console.log(repo);
    return fetch("//api.github.com/repos/" + repo + "/commits?branch=master")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((commits) => {
        return `${commits[0].sha}-${Date.now()}`;
      });
  } else {
    return `${Date.now()}`;
  }
};
