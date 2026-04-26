const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

class MerchantPlanPage {
    menu_plan=  '//*[@class="ant-menu-title-content" and text()="Plan"]'
    // new_plan_btn= '//*[@class="anticon anticon-plus"]/../following-sibling::span[text()="New plan"]'
    new_plan_btn = '//*[@class="ant-btn-icon"]/span[@aria-label="plus"]'
    plan_name_label=  '//*[@for="planName"]'
    plan_name= '//*[@id="planName"]'
    plan_description_label= '//*[@for="description"]'
    plan_description= '//*[@id="description"]'
    status_label=  '//*[@for="status"]'
    status=  '//*[@id="status"]'
    is_published_label= '//*[@for="publishStatus"]'
    is_published= '//*[text()="Publish"]'
    currency_label=  '//*[@for="currency"]'
    currency = '//*[@id="currency"]'
    price_label=  '//*[@for="amount"]'
    price=  '//*[@id="amount"]'
    intervalUnit_label =  '//*[@for="intervalUnit"]'
    intervalUnit =  '//*[@id="intervalUnit"]'
    intervalCount_label=  '//*[@for="intervalCount"]'
    intervalCount=  '//*[@id="intervalCount"]'
    plan_type_label = '//*[@for="type"]'
    plan_type=  '//*[@id="type"]'
    add_ons_label = '//*[@for="addonIds"]'
    add_ons = '//*[@id="addonIds"]'
    onetimeAddonIds_label = '//*[@for="onetimeAddonIds"]'
    onetimeAddonIds = '//*[@id="onetimeAddonIds"]'
    allow_trial_label = '//*[@for="enableTrial"]'
    allow_trial = '//*[@id="enableTrial"]'
    trial_price_label = '//*[@for="trialAmount"]'
    trial_price = '//*[@id="trialAmount"]'
    trial_length_label = '//*[@for="trialDurationTime"]'
    trial_length = '//*[@id="trialDurationTime"]'
    trial_requires_bank_card_info_label = '//*[@for="trialDemand"]'
    trial_requires_bank_card_info = '//*[@id="trialDemand"]'
    auto_renew_after_trial_end_label = '//*[@for="cancelAtTrialEnd"]'
    auto_renew_after_trial_end = '//*[@id="cancelAtTrialEnd"]'
    billable_metrics_label = '//*[@title="Billable Metrics"]'
    Custom_data_label = '//*[@for="metadata"]'
    back_btn = '//*[text()="Go Back"]'
    save_btn = '//*[text()="Save"]'
    activate_btn = '//*[text()="Activate"]'
    publish_btn = '//*[text()="Publish"]'
    delete_btn = '//*[text()="Delete"]'
    confirm_delete_btn = '//*[@class="ant-popconfirm-buttons"]/button'
    plan_list_table = '//*[@class="ant-table-tbody"]'

    selectCurrency = async function (driver, currency = "EUR"){
        console.log("selectCurrency: " , currency);
        let currency_list = {
            "EUR": "//div[3]/div/div/div[2]/div/div/div/div/div",
            "USD": "//div[2]/div/div/div/div[2]/div",
            "JPY": "//div/div[3]/div"
        }
        if (currency !== "EUR"){
            await baseStep.input(driver,this.currency, currency);
            await baseStep.wait(driver, 1000)
            await baseStep.click(driver, currency_list[currency]);
            await baseStep.wait(driver, 1000)

        }
    }

    inputIntervalCount = async function (driver, intervalCount = 1){
        console.log("inputIntervalCount: " , intervalCount);
        let ele =  await driver.findElement(By.xpath(this.intervalCount));
        await driver.executeScript("arguments[0].value = '"+intervalCount+"';", ele);
        // await baseStep.input(driver,this.intervalCount, intervalCount);
        await baseStep.wait(driver, 1000)
    }

    inputTrialPrice = async function (driver, price = 1){
        console.log("inputTrialPrice: " , price);
        let ele =  await driver.findElement(By.xpath(this.trial_price));
        await driver.executeScript("arguments[0].value = '"+price+"';", ele);
        // await baseStep.input(driver,this.intervalCount, intervalCount);
        await baseStep.wait(driver, 1000)
    }

    selectIntervalUnit = async function (driver, IntervalUnit = "month"){
        console.log("selectIntervalUnit: " , IntervalUnit);
        let IntervalUnit_list = {
            "day": "//div[3]/div/div/div[2]/div/div/div/div/div",
            "week": "//div[2]/div/div/div/div[2]/div",
            "month": "//div/div[3]/div",
            "year": "//div/div/div[4]/div"
        }
        if (IntervalUnit !== "month"){
            await baseStep.input(driver,this.intervalUnit, IntervalUnit);
            await baseStep.wait(driver, 1000)
            await baseStep.click(driver, IntervalUnit_list[IntervalUnit]);
            await baseStep.wait(driver, 1000)

        }
    }

    selectPlanType = async function (driver, type = "Main type"){
        console.log("selectPlanType: " , type);
        let type_list = {
            "Main type": "//div[3]/div/div/div[2]/div/div/div/div/div",
            "Addon": "//div[2]/div/div/div/div[2]/div",
            "One time payment": "//div/div[3]/div"
        }
        if (type !== "Main type"){
            await baseStep.input(driver,this.plan_type, type);
            await baseStep.wait(driver, 2000)
            await baseStep.click(driver, type_list[type]);
            await baseStep.wait(driver, 1000)

        }
    }

    selectPlan= async function (driver, planName){
        console.log("selectPlan: " , planName);
        await baseStep.scrollIntoView(driver, "//*[text()='"+planName+"']");
        await baseStep.click(driver, "//*[text()='"+planName+"']");
        await baseStep.wait(driver,1000);

    }

}

module.exports = new MerchantPlanPage();
