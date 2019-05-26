import * as dotenv from "dotenv";
import express from "express";
import { fetchRelease } from "./lib/fetchRelease";
import { notifySlack } from "./lib/notifySlack";

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
  if(release.passed === "false"){
    notifySlack(release);
  }
  res.status(200).send("OK");
});

app.listen(port, (err: Error) => {
  if (err) {throw err; }
  console.log(`> Ready on http://localhost:${port}`);
});
