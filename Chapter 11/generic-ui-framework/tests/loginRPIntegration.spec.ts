import { test, expect } from "@playwright/test";
import { PageFactory } from "../utils/pageFactory";
import { LoginPage } from "../pages/loginPage";
import { logger } from "../utils/logging";
import { InventoryPage } from "../pages/inventoryPage";

test.describe("User Authentication Flow", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  test.beforeEach(async () => {
    loginPage = PageFactory.getPage("LoginPage") as LoginPage;
    inventoryPage = PageFactory.getPage("InventoryPage") as InventoryPage;
    await loginPage.init();
    await inventoryPage.init();
    logger.info("Login test setup: LoginPage and InventoryPage initialized.");
  });
  test("Should successfully login with valid credentials", async ({
    page,
  }, testInfo) => {
    // Add launch attributes for better categorization
    await testInfo.attach("Test Environment", {
      body: JSON.stringify({
        browser: testInfo.project.name,
        viewport: page.viewportSize(),
        userAgent: await page.evaluate(() => navigator.userAgent),
      }),
      contentType: "application/json",
    });

    await test.step("Navigate to login page", async () => {
      await loginPage.navigate("/");
      // Attach screenshot for visual context
      await testInfo.attach("Login Page Loaded", {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
      });
    });

    await test.step("Enter user credentials", async () => {
      await loginPage.login("standard_user", "secret_sauce");
    });

    await test.step("Verify successful authentication", async () => {
      expect(inventoryPage.page.url()).toContain("/inventory.html");

      // Log additional context for debugging
      console.log(`Login completed at: ${new Date().toISOString()}`);
      console.log(`Current URL: ${inventoryPage.page.url()}`);
    });
  });
  test.afterEach(async () => {
    // Close the Page instance managed by the Page Object.
    // This also triggers the closing of the Browser instance via the Singleton BrowserContext.
    await loginPage.closeBrowser();
    logger.info("Login test teardown: Browser and Page closed.");
  });
});
