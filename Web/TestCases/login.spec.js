"use strict";

const assert = require("assert");
const path = require("path");
const WebDriverFactory = require("../../Common/Web/webDriver");
const LoginPage = require("../PageObject/LoginPage");
const config = require("../../Common/config");
const { loadJson } = require("../../Common/testDataLoader");

describe("Unibee Web - Login", function () {
  let driver;
  let loginPage;

  before(async function () {
    driver = await WebDriverFactory.createDriver();
    loginPage = new LoginPage(driver);
  });

  after(async function () {
    await WebDriverFactory.quitDriver(driver);
  });

  it("should login successfully with valid credentials", async function () {
    const testData = loadJson(path.join("Web", "TestData", "loginData.json"));
    const username = process.env.WEB_USERNAME || testData.validUser.username || config.web.username;
    const password = process.env.WEB_PASSWORD || testData.validUser.password || config.web.password;

    await loginPage.open(config.web.baseUrl, config.web.targetPath);
    await loginPage.login(username, password);
    await loginPage.waitForLoginSuccess();

    const loggedIn = await loginPage.isLoggedIn();
    assert.strictEqual(loggedIn, true, "Login did not complete successfully");
  });
});
