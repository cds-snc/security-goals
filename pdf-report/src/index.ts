import * as dotenv from "dotenv";
import express from "express";
import { fetchControls } from "./lib/fetchRelease";
import { fetchRelease } from "./lib/fetchRelease";
import { generateReport } from "./lib/generateReport";

dotenv.config();

export const app: express.Application = express();

const port: number = parseInt(process.env.PORT, 10) || 3000;

app.get("*/alive", (req: express.Request, res: express.Response): void => {
  res.status(200).send("yes");
});

app.get("*/ready", (req: express.Request, res: express.Response): void => {
  res.status(200).send("yes");
});

app.get(`*/report`, async (req: express.Request, res: express.Response): Promise<void> => {
  const controls = await fetchControls();
  const release = await fetchRelease();

  const filename = `security-goals-${Date.now()}.pdf`;

  res.setHeader("Content-disposition", 'attachment; filename="' + filename + '"');
  res.setHeader("Content-type", "application/pdf");

  const doc = generateReport(release, controls);

  doc.pipe(res);
  doc.end();
});

app.listen(port, (err: Error) => {
  if (err) {throw err; }
  console.log(`> Ready on http://localhost:${port}`);
});
