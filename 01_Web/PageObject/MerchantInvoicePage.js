const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantInvoicePage {
    menu_Invoice=  '//*[@class="ant-menu-title-content" and text()="Invoice"]'
    invoice_id = '//*[text()="Invoice Id"]/following-sibling::div[1]'
    invoice_name = '//*[text()="Invoice Name"]/following-sibling::div[1]'
    invoice_amount = '//*[text()="Invoice Amount"]/following-sibling::div[1]'
    status = '(//*[text()="Status"]/following-sibling::div[1])[2]/span'
    mark_as_paid_button = '(//*[text()="Status"]/following-sibling::div[1])[2]/button'
    transfer_number = '//*[@id="TransferNumber"]'
    reason = '//*[@id="reason"]'
    mark_as_paid_confirm = '//*[@class="ant-modal-content"]//button[2]'
    invoice_items = '//*[text()="Invoice Items"]/following-sibling::div[1]/button'
    refund = '//*[text()="Refund"]/following-sibling::div[1]'
    payment_type = '//*[text()="Payment type"]/following-sibling::div[1]'
    discount_amount = '//*[text()="Discount Amount"]/following-sibling::div[1]'
    subscription_id = '//*[text()="Subscription Id"]/following-sibling::div[1]'
    payment_gateway = '//*[text()="Payment Gateway"]/following-sibling::div[1]'
    user_name = '//*[text()="User Name"]/following-sibling::div[1]'
    refund_btn = '//*[@aria-label="dollar"][1]'
    refund_reason = '//*[text()="Refund Reason:"]/following-sibling::input'
    refund_amount = '//*[text()="Refund Amt:"]/following-sibling::span/input'
    refund_confirm = '//*[text()="Refund"]'
    refund_wire_transfer_confirm = '//*[@aria-label="check-circle"]';
    refund_comment = '//*[@id="reason"]'
    mark_as_refunded_confirm = '//*[text()="Mark as Refunded"]'



    checkRecordInvoiceList = async function(driver, totalAmount="", type = "", status="",  Gateway = "", email = "",record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-tbody']", 20000);
        await baseStep.wait(driver,3000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record].findElements({ tagName: 'td' });
        if (totalAmount!== ""){
            expect(await cells[1].getText()).to.equal(totalAmount);
        }

        if (type !== ""){

            expect(await cells[2].getText()).to.equal(type);
        }

        if (status !== ""){

            expect(await cells[3].getText()).to.equal(status);
        }
        if (Gateway !== ""){

            expect(await cells[5].getText()).to.equal(Gateway);
        }

        if (email !== ""){

            expect(await cells[8].getText()).to.equal(email);
        }

        await baseStep.click(driver, "//*[@id=\"root\"]/div/div/main/div/div/div/div[2]/div/div/div/div/div/div[2]/table/tbody/tr[2]/td[1]/button/span");
        await baseStep.wait(driver,1000);

    }

}

module.exports = new MerchantInvoicePage();
