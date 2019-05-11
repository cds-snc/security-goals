import k8s = require("@kubernetes/client-node");
import { V1DeleteOptions } from "@kubernetes/client-node";
import {generateReleaseId} from "./generateReleaseId";
import {modifyJob} from "./modifyJob";

async function asyncForEach(
  array: any[],
  callback: (item: any, index: number, collection: any[]) => any
): Promise<any> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const runJobs = async () => {
  try {
    const kc = new k8s.KubeConfig();

    if (process.env.NODE_ENV === "production") {
      kc.loadFromCluster();
    } else {
      kc.loadFromDefault();
    }

    const jobsApi = kc.makeApiClient(k8s.Batch_v1Api);
    const namespace = process.env.JOBS_NAMESPACE || "security-goals";

    // Generate release ID
    const releaseId = await generateReleaseId();

    const res = await jobsApi.listNamespacedJob(namespace);

    if ("items" in res.body) {

      return asyncForEach(res.body.items, async (item) => {
        try {
          const name: string = item.metadata.name;
          console.log("Restarting", name);
          const options: V1DeleteOptions = {
            apiVersion: "batch/v1",
            dryRun: null,
            gracePeriodSeconds: null,
            kind: "DeleteOptions",
            orphanDependents: null,
            preconditions: null,
            propagationPolicy: "Foreground"
          };
          jobsApi.deleteNamespacedJob(name, namespace, "false", options);
          const body = await modifyJob(item, releaseId);
          await jobsApi.createNamespacedJob(namespace, body);
        } catch (err) {
          console.log(err);
        }
      });

    }
  } catch (err) {
    console.log(err);
  }
};
