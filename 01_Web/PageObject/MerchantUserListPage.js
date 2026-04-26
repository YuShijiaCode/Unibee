const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantUserListPage {
    menu_user_list=  '//*[@class="ant-menu-title-content" and text()="User List"]'
    filter_first_name = '//*[@id="firstName"]'
    filter_last_name = '//*[@id="lastName"]'
    filter_email = '//*[@id="email"]'
    clear_btn = '//*[text()="Clear"]'
    search_btn = '//*[text()="Search"]'
    add_new_btn = '//*[text()="Add New"]'
    info_first_name = '//*[text()="First Name"]/../following-sibling::div[1]'
    info_last_name = '//*[text()="Last Name"]/../following-sibling::div[1]'
    info_email = '//*[text()="Email"]/../following-sibling::div[1]/a'
    info_phone = '//*[text()="Phone"]/../following-sibling::div[1]'
    info_country = '//*[text()="Country"]/../following-sibling::div[1]'
    info_billing_address= '//*[text()="Billing Address"]/../following-sibling::div[1]'
    info_payment_method = '//*[text()="Payment Method"]/../following-sibling::div[1]'
    info_vat_number = '//*[text()="VAT Number"]/../following-sibling::div[1]'
    account_tab = '//*[@data-node-key="AccountInfo"]'
    subscription_tab = '//*[@data-node-key="Subscription"]'
    invoice_tab = '//*[@data-node-key="Invoice"]'
    transaction_tab = '//*[@data-node-key="Transaction"]'


    checkRecordUserList = async function(driver, firstName="", lastName="", email="", status="",record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-cell' and text()='First Name']", 20000);
        await baseStep.wait(driver,10000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (firstName !== ""){
            expect(await cells[0].getText()).to.equal(firstName);
        }
        if (lastName!== ""){
            expect(await cells[1].getText()).to.equal(lastName);
        }
        if (email !== ""){

            expect(await cells[2].getText()).to.equal(email);
        }
        if (status !== ""){

            expect(await cells[7].getText()).to.equal(status);
        }

    }


}

module.exports = new MerchantUserListPage();
