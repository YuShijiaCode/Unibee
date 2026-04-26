const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

class UserMySubPage {
    menu_my_subscription=  '//*[@class="ant-menu-title-content" and text()="My Subscription"]'
    sub_status = '//*[text()="Status"]/following-sibling::div[1]/span'
    cancel_sub_button = '//span[text()="CANCEL"]'
    cancel_confirm_button = '//span[text()="Yes, Cancel it"]'



}

module.exports = new UserMySubPage();
