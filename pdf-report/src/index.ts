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

app.get([`*/`], async (req: express.Request, res: express.Response): Promise<void> => {
  let id;
  if (req.params[0]) {
    id = req.params[0].split("/");
    id = id[id.length - 1];
  }

  const controls = await fetchControls();
  const release = await fetchRelease(id);

  if (release) {
    const filename = `security-goals-${Date.now()}.pdf`;

    res.setHeader("Content-disposition", 'attachment; filename="' + filename + '"');
    res.setHeader("Content-type", "application/pdf");

    const doc = generateReport(release, controls);

    doc.pipe(res);
    doc.end();
  } else {
    res.status(404).send("Release not found");
  }
});

app.listen(port, (err: Error) => {
  if (err) {throw err; }
  console.log(`> Ready on http://localhost:${port}`);
});
