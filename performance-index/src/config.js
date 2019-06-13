export const runtimeConfig =
  typeof window !== "undefined"
    ? {
        api_url: window.env ? window.env.api_url : "",
        app_name: window.env ? window.env.app_name : "",
        relative_path: window.env ? window.env.relative_path : "",
        web_report: window.env ? window.env.web_report : ""
      }
    : {
        api_url: process.env.API_URL || "",
        app_name: process.env.APP_NAME || "",
        relative_path: process.env.RELATIVE_PATH || "",
        web_report: process.env.WEB_REPORT || ""
      };
