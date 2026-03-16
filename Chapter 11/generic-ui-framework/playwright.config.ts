// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./config/environments";
import * as dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  // Specifies the directory where your test files are located.

  testDir: "./tests",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // Example: run with 1 worker in CI, default (based on CPU cores) locally.
  reporter: [
    ["html"],
    [
      "@reportportal/agent-js-playwright",
      {
        apiKey: process.env.RP_API_KEY || "",
        endpoint: process.env.RP_ENDPOINT || "",
        project: process.env.RP_PROJECT || "",
        launch: process.env.RP_LAUNCH_NAME || "",
        description: process.env.RP_DESCRIPTION || "",
        attributes: [
          { key: "framework", value: "playwright" },
          { key: "build", value: process.env.BUILD_NUMBER || "local" },
          { key: "branch", value: process.env.GIT_BRANCH || "main" },
          { key: "environment", value: process.env.NODE_ENV || "development" },
        ],
        debug: true,
        reportError: true,
        reportLogs: true,
        reportScreenshots: true,
        logLevel: "info",
        mode: "DEFAULT",
      },
    ],
  ], // Generates an HTML report after tests complete.

  // Defines global settings for all tests and projects.

  use: {
    // Configures trace collection for debugging. 'on-first-retry' captures a trace if a test fails on its first attempt.

    trace: "on-first-retry", // Options: 'off', 'on', 'on-first-retry', 'retain-on-failure'

    // Sets the base URL for all page navigations. This allows you to use relative paths in your tests.

    baseURL: envConfig.baseUrl,

    // Sets the maximum time (in milliseconds) for navigation actions to complete.

    navigationTimeout: 5000, // 5 seconds

    // Sets the maximum time for an action (e.g., click, fill) to complete. (Uncomment if needed)

    // actionTimeout: 5000, // 5 seconds
  },

  // Defines different "projects" (configurations) for running tests across various browsers or environments.

  projects: [
    {
      name: "chromium", // Project name for Chrome/Chromium browser

      use: {
        // Spreads Playwright's default desktop Chrome device settings.

        ...devices["Desktop Chrome"],

        // Explicitly specifies the 'chrome' channel for the browser.

        channel: "chrome",

        // Sets the browser to run in non-headless mode (browser UI is visible). Set to true for CI.

        headless: false,

        // Configures launch options for the browser. (Uncomment if needed)

        launchOptions: {
          // slowMo: 50, // Slows down operations by 50ms for visual debugging
        },

        // Optional: Path to a state file for authenticated sessions.

        // storageState: 'auth.json',
      },
    },

    // Example for other browsers (uncomment and configure as needed):
    {
      name: "webkit",

      use: {
        ...devices["Desktop Safari"],

        headless: false,
      },
    },
  ],
});
