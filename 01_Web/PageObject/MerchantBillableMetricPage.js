const baseStep = require("../../CommonStep/Web/Web_Common_Step");
const webdriver = require('selenium-webdriver');
const {expect} = require("chai");
const By = webdriver.By;

class MerchantBillableMetricPage {
    menu_billable_metric=  '//*[@class="ant-menu-title-content" and text()="Billable Metric"]'
    new_billable_metric = '//*[@class="ant-btn-icon"]/span[@aria-label="plus"]'
    metric_name = '//*[@id="metricName"]'
    metric_code = '//*[@id="code"]'
    metric_description = '//*[@id="metricDescription"]'
    aggregation_type = '//*[@id="aggregationType"]'
    aggregation_property = '//*[@id="aggregationProperty"]'
    save_btn = '//*[text()="Save"]'

    selectAggregationType = async function (driver, type){
        console.log("selectAggregationType: " , type);
        let type_list = {
            "count": "//div/div/div[2]/div/div/div/div/div",
            "count unique": "//div[2]/div/div/div/div[2]/div",
            "latest": "//div/div[3]/div",
            "max":"//div/div/div[4]/div",
            "sum": "//div[2]/div/div/div/div[5]/div"
        }
            await baseStep.input(driver,this.aggregation_type, type);
            await baseStep.wait(driver, 1000)
            await baseStep.click(driver, type_list[type]);
            await baseStep.wait(driver, 1000)
    }


    checkRecordBillableMetric = async function(driver, name="", code="", description="", type="",aggregationType = "",aggregationProperty = "",record =1){
        await baseStep.waitUntilElement(driver, "//*[@class='ant-table-cell' and text()='Aggregation Type']", 20000);
        await baseStep.wait(driver,10000);
        let table = await driver.findElement(By.xpath("//*[@class='ant-table-tbody']"));

        let rows = await table.findElements({ tagName: 'tr' })
        console.log("rows.length: ",rows.length)

        let cells =  await rows[record-1].findElements({ tagName: 'td' });
        if (name !== ""){
            expect(await cells[0].getText()).to.equal(name);
        }
        if (code!== ""){
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

module.exports = new MerchantBillableMetricPage();
