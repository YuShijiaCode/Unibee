"use strict";

const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class WebDriverFactory {
  static async createDriver(options = {}) {
    const browserName = options.browserName || process.env.BROWSER || "chrome";
    const serverUrl = options.serverUrl || process.env.SELENIUM_SERVER_URL;
    const headless = String(options.headless ?? process.env.HEADLESS ?? "true") === "true";

    let builder = new Builder().forBrowser(browserName);

    if (serverUrl) {
      builder = builder.usingServer(serverUrl);
    }

    if (browserName === "chrome") {
      const chromeOptions = new chrome.Options();
      if (headless) {
        chromeOptions.addArguments("--headless=new");
      }
      chromeOptions.addArguments("--window-size=1440,1200");
      chromeOptions.addArguments("--disable-gpu");
      chromeOptions.addArguments("--no-sandbox");
      chromeOptions.addArguments("--disable-dev-shm-usage");
      builder = builder.setChromeOptions(chromeOptions);
    }

    const driver = await builder.build();
    await driver.manage().window().maximize();
    return driver;
  }

  static async quitDriver(driver) {
    if (driver) {
      await driver.quit();
    }
  }
}

module.exports = WebDriverFactory;
