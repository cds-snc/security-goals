import { modifyJob } from "../../lib/modifyJob";
import { V1Job, V1ObjectMeta } from "@kubernetes/client-node";

let job: V1Job = {
  apiVersion: null,
  kind: null,
  metadata: null,
  spec: null,
  status: null
};

let metadata: V1ObjectMeta = {
  annotations: {},
  clusterName: null,
  creationTimestamp: null,
  deletionGracePeriodSeconds: null,
  deletionTimestamp: null,
  finalizers: null,
  generateName: null,
  generation: null,
  initializers: null,
  labels: null,
  name: null,
  namespace: null,
  ownerReferences: null,
  resourceVersion: null,
  selfLink: null,
  uid: null,
};

let nextJob: V1Job = {
  apiVersion: null,
  kind: null,
  metadata: null,
  spec: null,
  status: null
};

job.metadata = metadata;

nextJob.metadata = metadata;
nextJob.metadata.annotations["kubectl.kubernetes.io/last-applied-configuration"] = '{"apiVersion":"batch/v1","kind":"Job","metadata":{"annotations":{},"name":"pi-symmorfosi-auto-1543516767145","namespace":"symmorfosi-jobs"},"spec":{"backoffLimit":4,"template":{"spec":{"containers":[{"command":["perl","-Mbignum=bpi","-wle","print bpi(2000)"],"image":"perl","env":[{"name":"RELEASE","value":"ABCD"}],"name":"pi"}],"restartPolicy":"Never"}}}}';

test("handles invalid entries", async () => {

  expect(await modifyJob( job, "abcd")).toEqual(job);

  metadata.name = "-security-goals-auto-";
  metadata.annotations = {};

  expect(
    await modifyJob(job, "abcd"),
  ).toEqual(job);

});

test("adds metadata for jobs that were added manually", async () => {

  metadata.name = "foo";
  metadata.annotations = {"kubectl.kubernetes.io/last-applied-configuration": '{"apiVersion":"batch/v1","kind":"Job","metadata":{"annotations":{},"name":"pi-symmorfosi-auto-1543516767145","namespace":"symmorfosi-jobs"},"spec":{"backoffLimit":4,"template":{"spec":{"containers":[{"command":["perl","-Mbignum=bpi","-wle","print bpi(2000)"],"image":"perl","env":[{"name":"RELEASE","value":"ABCD"}],"name":"pi"}],"restartPolicy":"Never"}}}}'};

  job.metadata = metadata;

  const modifiedJob = await modifyJob(job, "abcd");

  expect(modifiedJob.metadata.name).not.toEqual(job.metadata.name);

  expect(
    modifiedJob.metadata.annotations[
      "kubectl.kubernetes.io/last-applied-configuration"
    ],
  ).not.toEqual(
    job.metadata.annotations[
      "kubectl.kubernetes.io/last-applied-configuration"
    ],
  );
});

test("modifies metadata for an already modified job", async () => {
  const modifiedNextJob = await modifyJob(nextJob, "abcd");

  expect(modifiedNextJob.metadata.name).not.toEqual(nextJob.metadata.name);

  expect(
    modifiedNextJob.metadata.annotations[
      "kubectl.kubernetes.io/last-applied-configuration"
    ],
  ).not.toEqual(
    nextJob.metadata.annotations[
      "kubectl.kubernetes.io/last-applied-configuration"
    ]
  );
});

test("adds the release on a job if it does not exist and an env variables exit", async () => {
  const modifiedNextJob = await modifyJob(job, "abcd");

  expect(modifiedNextJob.spec.template.spec.containers[0].env).not.toEqual(
    null,
  );
});

test("adds the release on a job if it does not exist and no env variables exit", async () => {
  const modifiedNextJob = await modifyJob(job, "abcd");

  expect(modifiedNextJob.spec.template.spec.containers[0].env).not.toEqual(
    null,
  );
});

