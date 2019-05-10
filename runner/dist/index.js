"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v4_1 = __importDefault(require("uuid/v4"));
const runJobs_1 = require("./lib/runJobs");
exports.app = express_1.default();
const port = parseInt(process.env.PORT, 10) || 3000;
const path = process.env.WEBHOOK_URL || v4_1.default();
exports.app.get("/alive", (req, res) => {
    res.status(200).send("yes");
});
exports.app.get("/ready", (req, res) => {
    res.status(200).send("yes");
});
exports.app.post(`/${path}`, (req, res) => {
    runJobs_1.runJobs();
    res.send("Running jobs");
});
exports.app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Webhook listening on: /${path}`);
});
//# sourceMappingURL=index.js.map