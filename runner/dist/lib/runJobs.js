"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_node_1 = __importDefault(require("@kubernetes/client-node"));
const generateReleaseId_1 = require("./generateReleaseId");
const modifyJob_1 = require("./modifyJob");
function asyncForEach(array, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < array.length; index++) {
            yield callback(array[index], index, array);
        }
    });
}
exports.runJobs = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const kc = new client_node_1.default.KubeConfig();
        if (process.env.NODE_ENV === "production") {
            kc.loadFromCluster();
        }
        else {
            kc.loadFromDefault();
        }
        const jobsApi = kc.makeApiClient(client_node_1.default.Batch_v1Api);
        const namespace = process.env.JOBS_NAMESPACE || "security-goals";
        // Generate release ID
        const releaseId = yield generateReleaseId_1.generateReleaseId();
        const res = yield jobsApi.listNamespacedJob(namespace);
        if ("items" in res.body) {
            return asyncForEach(res.body.items, (item) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const name = item.metadata.name;
                    console.log("Restarting", name);
                    jobsApi.deleteNamespacedJob(name, namespace, item);
                    const body = yield modifyJob_1.modifyJob(item, releaseId);
                    yield jobsApi.createNamespacedJob(namespace, body);
                }
                catch (err) {
                    console.log(err);
                }
            }));
        }
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=runJobs.js.map