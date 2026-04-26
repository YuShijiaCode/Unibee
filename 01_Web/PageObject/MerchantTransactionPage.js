const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantTransactionPage {
    menu_transaction=  '//*[@class="ant-menu-title-content" and text()="Transaction"]'

    checkRecordTransactionList = async function(driver,  totalAmount="",  status="", type= "",Gateway = "",record = 1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-tbody']", 20000);
        await baseStep.wait(driver,5000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)
        // *[@id="root"]/div/div/main/div/div/div[1]/div/div/div/div/div[2]/table/tbody/tr[2]/td[3]/div/span
        let cells =  await rows[record].findElements({ tagName: 'td' });
        if (totalAmount!== ""){

            // let amount = await cells[2].findElement({ tagName: 'div' })
            // let amount = await driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/main/div/div/div[1]/div/div/div/div/div[2]/table/tbody/tr["+(record+1)+"]/td[3]/div/span"))
            expect(await cells[2].getText()).to.equal(totalAmount);
        }
        if (status !== ""){
            expect(await cells[3].getText()).to.equal(status);
        }
        if (type !== ""){

            expect(await cells[4].getText()).to.equal(type);
        }

        if (Gateway !== ""){

            expect(await cells[5].getText()).to.equal(Gateway);
        }

    }

}

module.exports = new MerchantTransactionPage();
