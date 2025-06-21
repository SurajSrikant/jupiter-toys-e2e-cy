import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,

    //Needed for headless mode runs via ubuntu on azure pipelines
    setupNodeEvents(on, config) {},

    baseUrl: "http://jupiter.cloud.planittesting.com",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "src/fixtures",
    downloadsFolder: "cypress/downloads",
    retries: 1,
    video: false,
    trashAssetsBeforeRuns: true, // deletes videos/screenshots/reports
    reporter: "junit",
  },
});
