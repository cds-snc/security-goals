import FormData from "form-data";
const fetch = require("node-fetch");

export const sendEmail = async (release: any) => {
  const token = process.env.API_TOKEN;
  const form = new FormData();

  form.append("email", process.env.EMAIL_RECIPIENTS);
  form.append("message", `A new security goals report is ready for ${process.env.APP_NAME}.`);
  const resp = await fetch(process.env.PDF_REPORT_URL);
  const data = await resp.buffer();
  form.append("file", data, { filename : `security-goals-report-${Date.now()}.pdf`, contentType: "application/pdf"});

  const endpoint = process.env.EMAIL_ENDPOINT;
  await fetch(endpoint, { method: "POST", body: form, headers: {Authorization: `Bearer ${token}`}});
};
