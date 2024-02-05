import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./api/client.ts";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
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

if (import.meta.env.DEV) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const root = document.getElementById("root");
registerServiceWorker().then(() => {
  setupNotification();
  if (root) {
    registerServiceWorker().then(() => {
      ReactDOM.createRoot(root).render(
        <React.StrictMode>
          <Theme appearance="dark">
            <ApolloProvider client={apolloClient}>
              <App />
            </ApolloProvider>
          </Theme>
        </React.StrictMode>,
      );
    });
  }
});
