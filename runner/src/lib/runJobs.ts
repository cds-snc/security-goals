import k8s = require("@kubernetes/client-node");
import { generateReleaseId } from "./generateReleaseId";
import { modifyJob } from "./modifyJob";
import RunLock from "./RunLock";
import { uniqueArray } from "../lib/getUnique";
import { V1DeleteOptions } from "@kubernetes/client-node";

async function asyncForEach(
  array: any[],
  callback: (item: any, index: number, collection: any[]) => any
): Promise<any> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export const runJobs = async (): Promise<void> => {
  if (RunLock.locked) {
    return;
  }

  RunLock.locked = true;

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

  if (!res.body.items) {
    RunLock.locked = false;
    return;
  }

  const items = uniqueArray(res.body.items);
  console.log(items.length);

  await asyncForEach(items, async (item) => {
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
    await jobsApi.deleteNamespacedJob(name, namespace, "false", options);
    const body = await modifyJob(item, releaseId);
    await jobsApi.createNamespacedJob(namespace, body);
  });

  // console.log("runJobs done unlock", RunLock.locked);
  RunLock.locked = false;
  return;
};
