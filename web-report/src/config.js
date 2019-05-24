export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        api_url: window.env.api_url,
        relative_path: window.env.relative_path || ""
      }
    : {
        api_url: process.env.API_URL,
        relative_path: process.env.RELATIVE_PATH || ""
      };