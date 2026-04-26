const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const By = webdriver.By;

class UserOrderPreviewPage {
    title_description=  '//*[@class="ant-modal-body"]/div/div/div[1]/div[1]'
    title_price=  '//*[@class="ant-modal-body"]/div/div/div[1]/div[2]'
    title_quantity=  '//*[@class="ant-modal-body"]/div/div/div[1]/div[3]'
    title_amount=  '//*[@class="ant-modal-body"]/div/div/div[1]/div[4]'
    content_description = '//*[@class="ant-modal-body"]/div/div/div[2]/div/div[1]'
    content_price = '//*[@class="ant-modal-body"]/div/div/div[2]/div/div[2]'
    content_quantity = '//*[@class="ant-modal-body"]/div/div/div[2]/div/div[3]'
    content_amount = '//*[@class="ant-modal-body"]/div/div/div[2]/div/div[4]'
    vat_number = '//*[@placeholder="Your VAT number"]'
    vat_company_address = '//*[text()="Company Address"]/../following-sibling::div/span'
    vat_company_name = '//*[text()="Company Name"]/../following-sibling::div/span'
    vat_company_code = '//*[text()="Company Code"]/../following-sibling::div/span'
    country = '//*[@type="search"]'
    discount_code = '//*[text()="Discount code"]/../following-sibling::div/div/span/input'
    discount_code_apply = '//*[text()="Discount code"]/../following-sibling::div/div/span[2]/button'
    saved = '//*[text()="Saved"]/following-sibling::div'
    tax = '//*[text()="Tax"]/following-sibling::div'
    order_total = '//*[text()="Order Total"]/following-sibling::div'
    bank_card = '//*[@for="payment-stripe"]'
    wire_transfer = '//*[@for="payment-wire_transfer"]'

    setCountry= async function (driver, countryName){
        console.log("set country: " , countryName);
        // await driver.executeScript(`document.getElementsByClassName("ant-select-selection-item").title = '${countryName}';`)
        // await driver.executeScript(`document.getElementsByClassName("ant-select-selection-item").textContent = '${countryName}';`)
        // let element = driver.findElement(By.className('ant-select-selection-item'));
        //
        // let js = `arguments[0].setAttribute("title", "${countryName}");`;
        // await driver.executeScript(js, element);
        // await driver.executeScript(`arguments[0].innerText = "${countryName}";`, element);
        let xpath = '//div[3]/div/div/div[2]/div/div/div/div/div'
        await baseStep.input(driver, this.country, countryName);
        await baseStep.wait(driver, 1000);
        await baseStep.click(driver, xpath);
    }






}

module.exports = new UserOrderPreviewPage();
