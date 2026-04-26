const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const {expect} = require("chai");

class MerchantSubscriptionPage {
    menu_subscription=  '//*[@class="ant-menu-title-content" and text()="Subscription"]'
    first_name  = '//span[text()="First Name"]/..//following-sibling::div[1]'
    last_name = '//span[text()="Last Name"]/..//following-sibling::div[1]'
    email = '//span[text()="Email"]/..//following-sibling::div[1]'
    phone = '//span[text()="Phone"]/..//following-sibling::div[1]'
    country = '//span[text()="Country"]/..//following-sibling::div[1]'
    billing_address = '//span[text()="Billing Address"]/..//following-sibling::div[1]'
    payment_method = '//span[text()="Payment Method"]/..//following-sibling::div[1]'
    Vat_number = '//span[text()="VAT Number"]/..//following-sibling::div[1]'
        subscription_tab = '//*[@data-node-key="Subscription"]'
        account_tab = '//*[@data-node-key="Account"]'
        Invoices_tab = '//*[@data-node-key="Invoices"]'
        Payment_tab = '//*[@data-node-key="Payment"]'
    sub_plan = '//*[text()="Plan"]/following-sibling::div[1]'
    sub_plan_description = '//*[text()="Plan Description"]/following-sibling::div[1]'
    sub_status = '//*[text()="Status"]/following-sibling::div[1]/span'
    sub_subscription_id = '//*[text()="Subscription Id"]/following-sibling::div[1]'
    sub_plan_price = '//*[text()="Plan Price"]/following-sibling::div[1]'
    sub_addons_price = '//*[text()="Addons Price"]/following-sibling::div[1]'
    sub_discount_amount = '//*[text()="Discount Amount"]/following-sibling::div[1]'
    sub_total_amount = '//*[text()="Total Amount"]/following-sibling::div[1]'
    sub_bill_period = '//*[text()="Bill Period"]/following-sibling::div[1]'
    sub_next_due_date = '//*[text()="Next due date"]/following-sibling::div[1]//input'
    sub_first_pay = '//*[text()="First Pay"]/following-sibling::div[1]'
    sub_payment_gateway = '//*[text()="Payment Gateway"]/following-sibling::div[1]'
    end_subscription = '//*[text()="End Subscription"]'
    end_immediately = '//*[text()="immediately"]'
    end_OK_btn = '(//*[@type = "button"]/span[text()="OK"])[2]'


    checkRecordSubList = async function(driver, planName="", description="", amount="", status="", user= "", record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-cell' and text()='Plan Name']", 20000);
        await baseStep.wait(driver,10000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (planName !== ""){
            expect(await cells[0].getText()).to.equal(planName);
        }
        if (description!== ""){
            expect(await cells[1].getText()).to.equal(description);
        }
        if (amount !== ""){

            expect(await cells[2].getText()).to.equal(amount);
        }
        if (status !== ""){

            expect(await cells[3].getText()).to.equal(status);
        }
        if (user !== ""){

            expect(await cells[6].getText()).to.equal(user);
        }

    }

    selectSubByPlanName = async function(driver, planName){
        console.log("select sub by plan name: ", planName);
        await baseStep.click(driver, "(//span[text()="+planName+"])[1]");
        await baseStep.wait(driver, 1000);
    }

}

module.exports = new MerchantSubscriptionPage();