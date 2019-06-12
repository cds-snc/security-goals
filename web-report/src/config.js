export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        api_url: (window.env ? window.env.api_url : ""),
        app_name: (window.env ? window.env.app_name : ""),
        github_repo: (window.env ? window.env.github_repo : ""),
        pdf_report_url: (window.env ? window.env.pdf_report_url : ""),
        relative_path: (window.env ? window.env.relative_path : "")
      }
    : {
        api_url: process.env.API_URL || "",
        app_name: process.env.APP_NAME || "",
        github_repo: process.env.GITHUB_REPO || "",
        pdf_report_url: process.env.PDF_REPORT_URL || "",
        relative_path: process.env.RELATIVE_PATH || ""
      };