import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import { setupNotification } from "./utils/notificationUtils.ts";

async function registerServiceWorker() {
  if (import.meta.env.PROD) {
    return navigator.serviceWorker.register("/sw.js", { scope: "/" });
  }

  if (import.meta.env.VITE_MOCK) {
    const { worker } = await import("./api/mocks/browser");
    return worker.start();
  }
}
export default async function prepareApp() {
  if (import.meta.env.DEV) {
    if ("serviceWorker" in navigator) {
      const workers = await navigator.serviceWorker.getRegistrations();
      for (const worker of workers) {
        await worker.unregister();
      }
    }
  }
  await registerServiceWorker();

  if (import.meta.env.DEV) {
    loadDevMessages();
    loadErrorMessages();
  }
  setupNotification();

  return Promise.resolve();
}
