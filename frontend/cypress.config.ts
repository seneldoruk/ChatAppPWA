import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from "cypress-browser-permissions";

export default defineConfig({
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      return cypressBrowserPermissionsPlugin(on, config);
    },
    testIsolation: true,
  },
});
