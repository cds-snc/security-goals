import * as dotenv from "dotenv";
import express from "express";
import { fetchRelease } from "./lib/fetchRelease";
import { notifySlack } from "./lib/notifySlack";
import { sendEmail } from "./lib/sendEmail";

dotenv.config();

export const app: express.Application = express();

const port: number = parseInt(process.env.PORT, 10) || 3000;

app.get("*/alive", (req: express.Request, res: express.Response): void => {
  res.status(200).send("yes");
});

app.get("*/ready", (req: express.Request, res: express.Response): void => {
  res.status(200).send("yes");
});

app.get(`*/`, async (req: express.Request, res: express.Response): Promise<void> => {
  const release = await fetchRelease();
  if (release.passed === "false" && process.env.SLACK_WEBHOOK) {
    notifySlack(release);
  }
  if (process.env.EMAIL_ENDPOINT && process.env.EMAIL_RECIPIENTS && process.env.PDF_REPORT_URL) {
    await sendEmail(release);
  }
  res.status(200).send("OK");
});

app.listen(port, (err: Error) => {
  if (err) {throw err; }
  console.log(`> Ready on http://localhost:${port}`);
});
