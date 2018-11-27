const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.Batch_v1Api);

k8sApi
  .listNamespacedJob("symmorfosi")
  .then(res => {
    res.body.items.forEach(item => {
      let name = item.metadata.name;
      console.log(item);
      k8sApi
        .deleteNamespacedJob(name, "symmorfosi", item)
        .then(() => {
          let body = JSON.parse(
            item.metadata.annotations[
              "kubectl.kubernetes.io/last-applied-configuration"
            ]
          );
          if (name.includes("-symmorfosi-auto-")) {
            body.metadata.name = `${name.substring(
              0,
              name.indexOf("-symmorfosi-auto-")
            )}-symmorfosi-auto-${Date.now()}`;
          } else {
            body.metadata.name = `${name}-symmorfosi-auto-${Date.now()}`;
          }
          body.metadata.annotations[
            "kubectl.kubernetes.io/last-applied-configuration"
          ] = JSON.stringify(body);
          k8sApi
            .createNamespacedJob("symmorfosi", body)
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
  })
  .catch(e => console.log(e));
