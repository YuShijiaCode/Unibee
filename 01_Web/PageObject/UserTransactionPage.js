const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class UserTransactionPage {
    menu_transaction=  '//*[@class="ant-menu-title-content" and text()="Transaction"]'

    checkRecordTransactionList = async function(driver,  totalAmount="",  status="", type= "", gateway="" ,record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-tbody']", 20000);
        await baseStep.wait(driver,5000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)
        //*[@id="root"]/div/div/main/div/div/div[1]/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/span
        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (totalAmount!== ""){
            let amount=  await  cells[2].getText()
            // let amount = await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/main/div/div/div[1]/div/div/div/div/div[2]/table/tbody/tr["+(record+1)+"]/td[3]/div/span"))
            expect(await amount).to.equal(totalAmount);
        }
        if (status !== ""){
            let actualStatus =  await  cells[3].getText()
            // let actualStatus = await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/main/div/div/div[1]/div/div/div/div/div[2]/table/tbody/tr["+(record+1)+"]/td[4]/span"))
            expect(await actualStatus).to.equal(status);
        }
        if (type !== ""){

            expect(await cells[4].getText()).to.equal(type);
        }
        if (gateway !== ""){

            expect(await cells[6].getText()).to.equal(gateway);
        }

    }

}

module.exports = new UserTransactionPage();
