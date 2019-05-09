import { V1Job } from "@kubernetes/client-node";
import { join } from "path";

export const modifyJob = async (job: V1Job, releaseId: string): Promise<V1Job> => {

    if (
      job === undefined ||
      !("name" in job.metadata) ||
      !("annotations" in job.metadata) ||
      !(
        "kubectl.kubernetes.io/last-applied-configuration" in
        job.metadata.annotations
      )
    ) {
      return job;
    }

    const name = job.metadata.name;

    if (name == null) {
      return job;
    }

    // Get previous configuration
    const body = JSON.parse(
      job.metadata.annotations[
        "kubectl.kubernetes.io/last-applied-configuration"
      ]
    );

    // Update name of job container
    if (name.includes("-security-goals-auto-")) {
      body.metadata.name = `${name.substring(
        0,
        name.indexOf("-security-goals-auto-"),
      )}-security-goals-auto-${Date.now()}`;
    } else {
      body.metadata.name = `${name}-security-goals-auto-${Date.now()}`;
    }

    // Update Release ENV
    if ("env" in body.spec.template.spec.containers[0]) {

      let applied = false;

      body.spec.template.spec.containers[0].env.forEach((e: {name: string, value: string}) => {
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
    } else {
      body.spec.template.spec.containers[0].env = [
        { name: "RELEASE", value: releaseId },
      ];
    }

    // Re-apply new configuration
    body.metadata.annotations[
      "kubectl.kubernetes.io/last-applied-configuration"
    ] = JSON.stringify(body);

    return body;
  };
