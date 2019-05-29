import fetch from "node-fetch"

export const executeWebhook = async (): Promise<void> => {
  if (process.env.CALLBACK_WEBHOOK) {
    fetch(
      process.env.CALLBACK_WEBHOOK,
      { method: "POST", body: "" },
    ).catch((err: any) => {
      console.error(`Error triggering compliance api: ${err}`);
    });
  }
};
