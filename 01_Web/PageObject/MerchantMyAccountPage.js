const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantMyAccountPage {
    menu_My_Account=  '//*[@class="ant-menu-title-content" and text()="My Account"]'
    company_name = '//*[@id="company-info-form_companyName"]'
    physical_address = '//*[@id="company-info-form_address"]'
    company_email = '//*[@id="company-info-form_email"]'
    company_phone = '//*[@id="company-info-form_phone"]'
    save_btn = '//*[text()="Save"]'
    first_name = '//*[@id="merchant-user-profile_firstName"]'
    last_name = '//*[@id="merchant-user-profile_lastName"]'
    Email = '//*[@id="merchant-user-profile_email"]'
    mobile = '//*[@id="merchant-user-profile_mobile"]'
    Roles = '//*[@title="Roles"]/../following-sibling::div//span'
}

module.exports = new MerchantMyAccountPage();
