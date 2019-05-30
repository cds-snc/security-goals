import express from "express";
import uuid from "uuid/v4";
import { runJobs } from "./lib/runJobs";
import RunLock from "./lib/RunLock";

export const app: express.Application = express();

const port: number = parseInt(process.env.PORT, 10) || 3000;
const path: string = process.env.WEBHOOK_URL || uuid();

app.get(
  "*/alive",
  (req: express.Request, res: express.Response): void => {
    res.status(200).send("yes");
  }
);

app.get(
  "*/ready",
  (req: express.Request, res: express.Response): void => {
    res.status(200).send("yes");
  }
);

app.post(
  `*/${path}`,
  (req: express.Request, res: express.Response): void => {
    if (RunLock.locked) {
      console.log("Post locked");
      res.status(200).send(`Post Locked -> ${RunLock.locked}`);
      return;
    }

    runJobs();
    res.status(200).send("Running jobs");
  }
);

app.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
  console.log(`> Webhook listening on: /${path}`);
});
