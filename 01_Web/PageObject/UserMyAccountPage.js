const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class UserMyAccountPage {
    menu_my_account=  '//*[@class="ant-menu-title-content" and text()="My Account"]'
    account_type_Individual = '//*[text()="Individual"]'
    account_type_Business = '//*[text()="Business"]'
    first_name = '//*[@id="firstName"]'
    last_name = '//*[@id="lastName"]'
    email = '//*[@id="email"]'
    country = '//*[@id="countryCode"]'
    city = '//*[@id="city"]'
    zipCode = '//*[@id="zipCode"]'
    billing_address = '//*[@id="address"]'
    company_name = '//*[@id="companyName"]'
    VATNumber = '//*[@id="vATNumber"]'
    phone_number = '//*[@id="phone"]'
    Save_btn = '//*[text()="Save"]'
}

module.exports = new UserMyAccountPage();
