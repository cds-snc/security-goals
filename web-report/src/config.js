export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        api_url: window.env.api_url,
      }
    : {
        api_url: process.env.API_URL,
      };