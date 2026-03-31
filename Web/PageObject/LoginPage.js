"use strict";

const { until } = require("selenium-webdriver");
const BasePage = require("../../Common/Web/basePage");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.locators = {
      usernameInput: BasePage.By.css(".ant-modal-content input[placeholder*='email' i], .ant-modal-content input[type='email'], .ant-modal-content input:not([type])"),
      passwordInput: BasePage.By.css(".ant-modal-content input[type='password']"),
      loginButton: BasePage.By.css(".ant-modal-content button.ant-btn-primary"),
      modalContent: BasePage.By.css(".ant-modal-content")
    };
  }

  async open(baseUrl, targetPath = "") {
    const sanitizedBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const sanitizedPath = targetPath ? `/${targetPath.replace(/^\//, "")}` : "";
    await super.open(`${sanitizedBaseUrl}${sanitizedPath}`);
    await this.driver.wait(until.elementLocated(this.locators.modalContent), 20000);
  }

  async login(username, password) {
    await this.type(this.locators.usernameInput, username);
    await this.type(this.locators.passwordInput, password);
    await this.click(this.locators.loginButton);
  }

  async waitForLoginSuccess() {
    await this.driver.wait(async () => {
      const hasUsernameInput = await this.isVisible(this.locators.usernameInput, 1000);
      const hasPasswordInput = await this.isVisible(this.locators.passwordInput, 1000);
      const currentUrl = await this.driver.getCurrentUrl();
      return (!hasUsernameInput && !hasPasswordInput) || currentUrl.includes("/plan/new");
    }, 30000);
  }

  async isLoggedIn() {
    const currentUrl = await this.driver.getCurrentUrl();
    const usernameVisible = await this.isVisible(this.locators.usernameInput, 1000);
    return currentUrl.includes("/plan/new") || !usernameVisible;
  }
}

module.exports = LoginPage;
