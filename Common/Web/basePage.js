"use strict";

const { By, until } = require("selenium-webdriver");

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.defaultTimeout = Number(process.env.UI_WAIT_TIMEOUT || 10000);
  }

  async open(url) {
    await this.driver.get(url);
  }

  async find(locator, timeout = this.defaultTimeout) {
    await this.driver.wait(until.elementLocated(locator), timeout);
    return this.driver.findElement(locator);
  }

  async type(locator, text, timeout = this.defaultTimeout) {
    const element = await this.find(locator, timeout);
    await element.clear();
    await element.sendKeys(text);
  }

  async click(locator, timeout = this.defaultTimeout) {
    const element = await this.find(locator, timeout);
    await this.driver.wait(until.elementIsVisible(element), timeout);
    await element.click();
  }

  async getText(locator, timeout = this.defaultTimeout) {
    const element = await this.find(locator, timeout);
    return element.getText();
  }

  async isVisible(locator, timeout = this.defaultTimeout) {
    try {
      const element = await this.find(locator, timeout);
      return element.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}

BasePage.By = By;

module.exports = BasePage;
