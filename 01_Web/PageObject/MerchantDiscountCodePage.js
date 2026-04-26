const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantDiscountCodePage {
    menu_discount_code=  '//*[@class="ant-menu-title-content" and text()="Discount Code"]'
    new_discount_code = '//*[@class="ant-btn-icon"]/span[@aria-label="plus"]'
    name = '//*[@id="name"]'
    code = '//*[@id="code"]'
    billingType = '//*[@id="billingType"]'
    discountType = '//*[@id="discountType"]'
    currency = '//*[@id="currency"]'
    discountAmount = '//*[@id="discountAmount"]'
    discountPercentage = '//*[@id="discountPercentage"]'
    cycleLimit = '//*[@id="cycleLimit"]'
    validityRangeStart = '//*[@id="validityRange"]'
    validityRangeEnd = '//*[@placeholder="End date"]'
    validityRangeOK= "//span[contains(.,'OK')]"
    save_btn = '//*[text()="Save"]'

    selectBillingType = async function (driver, type = "One time use"){
        console.log("selectBillingType: " , type);
        let type_list = {
            "One time use": "//div[3]/div/div/div[2]/div/div/div/div/div",
            "Recurring": "//div[2]/div/div/div/div[2]/div",
        }
        if(type !== "One time use"){
            await baseStep.input(driver,this.billingType, type);
            await baseStep.wait(driver, 1000)
            await baseStep.click(driver, type_list[type]);
            await baseStep.wait(driver, 1000)
        }

    }

    selectDiscountType = async function (driver, type = "Percentage"){
        console.log("selectDiscountType: " , type);
        let type_list = {
            "Percentage": "//div[3]/div/div/div[2]/div/div/div/div/div",
            "Fixed amount": "//div[2]/div/div/div/div[2]/div",
        }
        let type_list_rec = {
            "Percentage": "(//div[3]/div/div/div[2]/div/div/div/div/div)[2]",
            "Fixed amount": "(//div[2]/div/div/div/div[2]/div)[2]",
        }
        if(type !== "Percentage") {
            try {
                await baseStep.input(driver, this.discountType, type);
                await baseStep.wait(driver, 1000)
                await baseStep.click(driver, type_list[type]);
                await baseStep.wait(driver, 1000)
            } catch {

            await baseStep.click(driver, type_list_rec[type]);
            await baseStep.wait(driver, 1000)
        }

        }

    }

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


    inputPercentage= async function (driver, percentage = 0){
        console.log("inputPercentage: " , percentage);
        let ele =  await driver.findElement(By.xpath(this.discountPercentage));
        await driver.executeScript("arguments[0].value = '"+percentage+"';", ele);
        // await baseStep.input(driver,this.intervalCount, intervalCount);
        await baseStep.wait(driver, 1000)
    }

    checkRecordDiscountCode= async function(driver, code="", name="", description="", type="",aggregationType = "",aggregationProperty = "",record =1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-cell' and text()='Aggregation Type']", 20000);
        await baseStep.wait(driver,10000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (code !== ""){
            expect(await cells[0].getText()).to.equal(name);
        }
        if (name!== ""){
            expect(await cells[1].getText()).to.equal(code);
        }
        if (description !== ""){

            expect(await cells[2].getText()).to.equal(description);
        }
        if (type !== ""){

            expect(await cells[3].getText()).to.equal(type);
        }
        if (aggregationType !== ""){

            expect(await cells[4].getText()).to.equal(aggregationType);
        }
        if (aggregationProperty !== ""){

            expect(await cells[5].getText()).to.equal(aggregationProperty);
        }

    }


}

module.exports = new MerchantDiscountCodePage();
