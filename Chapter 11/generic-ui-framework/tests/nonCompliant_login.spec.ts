import { test, expect } from "@playwright/test";

import { PageFactory } from "../utils/pageFactory";

import users from "../data/users.json";

import { logger } from "../utils/logging";

import { LoginPage } from "../pages/loginPage";

test.describe("Login Functionality Tests", () => {
  let loginPage: LoginPage;

  test.beforeEach(async () => {
    loginPage = PageFactory.getPage("LoginPage");

    await loginPage.init();
  });

  test("Standard user can login successfully", async ({ page }) => {
    await page.pause(); // BAD: leaves test hanging for manual intervention

    await loginPage.navigate("/");

    await page.waitForTimeout(3000); // BAD: makes test slow and flaky

    let unusedVar = 123; // BAD: unused variable

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password,
    );

    // BAD: no assertion for login success

    logger.info("Test done");
  });
});
