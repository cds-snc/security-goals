const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

function restartJobs() {
  const jobsApi = kc.makeApiClient(k8s.Batch_v1Api);

  jobsApi
    .listNamespacedJob("symmorfosi")
    .then(res => {
      res.body.items.forEach(item => {
        let name = item.metadata.name;
        jobsApi
          .deleteNamespacedJob(name, "symmorfosi", item)
          .then(() => {
            // Get previous configuration
            let body = JSON.parse(
              item.metadata.annotations[
                "kubectl.kubernetes.io/last-applied-configuration"
              ]
            );

            // Update name of job container
            if (name.includes("-symmorfosi-auto-")) {
              body.metadata.name = `${name.substring(
                0,
                name.indexOf("-symmorfosi-auto-")
              )}-symmorfosi-auto-${Date.now()}`;
            } else {
              body.metadata.name = `${name}-symmorfosi-auto-${Date.now()}`;
            }

            // Re-apply new configuration
            body.metadata.annotations[
              "kubectl.kubernetes.io/last-applied-configuration"
            ] = JSON.stringify(body);
            jobsApi
              .createNamespacedJob("symmorfosi", body)
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
    })
    .catch(e => console.log(e));
}

restartJobs();
