import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./api/client.ts";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

async function enableMocking() {
  if (!import.meta.env.VITE_MOCK) {
    return;
  }

  const { worker } = await import("./api/mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}
if (import.meta.env.DEV) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const root = document.getElementById("root");
if (root) {
  enableMocking().then(() => {
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
