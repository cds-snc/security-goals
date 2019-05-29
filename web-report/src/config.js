export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        api_url: (window.env ? window.env.api_url : ""),
        pdf_report_url: (window.env ? window.env.pdf_report_url : ""),
        relative_path: (window.env ? window.env.relative_path : "")
      }
    : {
        api_url: process.env.API_URL || "",
        pdf_report_url: process.env.PDF_REPORT_URL || "",
        relative_path: process.env.RELATIVE_PATH || ""
      };