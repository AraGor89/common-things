import { defineConfig } from "cypress";

const path = require("path");

export default defineConfig({
  env: {
    envFile: ".env.test.local",
  },
  e2e: {
    baseUrl: "https://www.google.com/",
    // baseUrl: "http://localhost:3000",
    // baseUrl: "https://example.cypress.io",
    excludeSpecPattern: "**/examples/*.cy.js",
    setupNodeEvents(on, config) {
      const envFile = config.env.envFile
        ? path.resolve(__dirname, `./${config.env.envFile}`)
        : null;
      require("dotenv").config({ path: envFile });
      config.env = { ...config.env, ...process.env };

      return config;
    },
  },
});
