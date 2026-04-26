const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class UserInvoicePage {
    menu_Invoice=  '//*[@class="ant-menu-title-content" and text()="Invoice"]'
    invoice_id = '//*[text()="Invoice Id"]/following-sibling::div[1]'
    invoice_name = '//*[text()="Invoice Name"]/following-sibling::div[1]'
    invoice_amount = '//*[text()="Invoice Amount"]/following-sibling::div[1]'
    status = '//*[text()="Status"]/following-sibling::div[1]'
    invoice_items = '//*[text()="Invoice Items"]/following-sibling::div[1]/button'
    refund = '//*[text()="Refund"]/following-sibling::div[1]'
    payment_type = '//*[text()="Payment type"]/following-sibling::div[1]'
    discount_amount = '//*[text()="Discount Amount"]/following-sibling::div[1]'
    subscription_id = '//*[text()="Subscription Id"]/following-sibling::div[1]'
    payment_gateway = '//*[text()="Payment Gateway"]/following-sibling::div[1]'
    user_name = '//*[text()="User Name"]/following-sibling::div[1]'


    checkRecordInvoiceList = async function(driver, invoiceId = "", totalAmount="",  status="",record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-tbody']", 20000);
        await baseStep.wait(driver,5000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (invoiceId !== ""){
            expect(await cells[0].getText()).to.equal(invoiceId);
        }
        if (totalAmount!== ""){
            expect(await cells[1].getText()).to.equal(totalAmount);
        }
        if (status !== ""){

            expect(await cells[2].getText()).to.equal(status);
        }

        await baseStep.click(driver, "//*[@class='ant-table-tbody']/tr[1]");
        await baseStep.wait(driver,1000);

    }

}

module.exports = new UserInvoicePage();
