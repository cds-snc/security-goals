"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyJob = (job, releaseId) => __awaiter(this, void 0, void 0, function* () {
    if (job === undefined ||
        !("name" in job.metadata) ||
        !("annotations" in job.metadata) ||
        !("kubectl.kubernetes.io/last-applied-configuration" in
            job.metadata.annotations)) {
        return job;
    }
    const name = job.metadata.name;
    if (name == null) {
        return job;
    }
    // Get previous configuration
    const body = JSON.parse(job.metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"]);
    // Update name of job container
    if (name.includes("-security-goals-auto-")) {
        body.metadata.name = `${name.substring(0, name.indexOf("-security-goals-auto-"))}-security-goals-auto-${Date.now()}`;
    }
    else {
        body.metadata.name = `${name}-security-goals-auto-${Date.now()}`;
    }
    // Update Release ENV
    if ("env" in body.spec.template.spec.containers[0]) {
        let applied = false;
        body.spec.template.spec.containers[0].env.forEach((e) => {
            if (e.name === "RELEASE") {
                e.value = releaseId;
                applied = true;
            }
        });
        if (!applied) {
            body.spec.template.spec.containers[0].env.push({
                name: "RELEASE",
                value: releaseId,
            });
        }
    }
    else {
        body.spec.template.spec.containers[0].env = [
            { name: "RELEASE", value: releaseId },
        ];
    }
    // Re-apply new configuration
    body.metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"] = JSON.stringify(body);
    return body;
});
//# sourceMappingURL=modifyJob.js.map