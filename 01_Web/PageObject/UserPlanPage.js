const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

class UserPlanPage {
    menu_plan=  '//*[@class="ant-menu-title-content" and text()="Plans"]'
    plan_card =  '//*[text()="Month Plan"]'
    plan_page_sign = '//*[text()="One-time Addons"]'
    one_time_addons_tab= '//*[text()="One-time Addons"]'
    confirm_btn = '//*[text()="Buy"]'
    one_time_confirm_btn = '(//*[text()="Buy"])[2]'
    order_preview_title = '//*[text()="Order Preview"]'
    bank_card = '//*[@for="payment-stripe"]'
    wire_transfer = '//*[@for="payment-wire_transfer"]'
    crypto_currency = '//*[@for="crypto-payment"]'
    OK_btn = '//*[@class="confirm-btn-wrapper"]//span[text()="OK"]'
    one_time_OK_btn = '//*[@class="modal-content-wrapper"]//span[text()="OK"]'
    change_card_btn = '//*[@id="root"]/div/div/div[2]/main/div/div[2]/form/div[1]/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div/div/div[2]/div/div[2]/button/div'
    pay_btn = '//button/div[3]'
    card_number = '//*[@id="cardNumber"]'
    card_expiry = '//*[@id="cardExpiry"]'
    card_cvc = '//*[@id="cardCvc"]'
    billing_name = '//*[@id="billingName"]'
    payment_success_sign = '//*[text()="Payment succeeded!"]'
    wire_transfer_no_finish = '//button[contains(@class, "cancel")]'
    wire_transfer_Yes_finish = '//button[contains(@class, "confirm")]'



    selectPlan= async function (driver, planName){
        console.log("selectPlan: " , planName);
        await baseStep.scrollIntoView(driver, "//*[text()='"+planName+"']");
        await baseStep.click(driver, "//*[text()='"+planName+"']");
        await baseStep.wait(driver,1000);
        try{
            await baseStep.click(driver, this.confirm_btn);
        }
        catch(e){
            await baseStep.click(driver, this.one_time_confirm_btn);
        }
        await baseStep.wait(driver,1000);

    }




}

module.exports = new UserPlanPage();
