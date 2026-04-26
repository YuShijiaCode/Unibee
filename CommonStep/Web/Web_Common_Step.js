const expect = require('chai').expect;

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const Key = webdriver.Key;
const until = webdriver.until;

exports.access_url = async function (driver, url) {
    console.log('Access url <' + url + '>');
    //Access target url
    driver.manage().window().maximize();
    driver.get(url);

};

exports.inputInAlert = async function (driver, username, password) {
    await console.log('Input <' + username + " "+ password + '>');
    await driver.wait(until.alertIsPresent, 10000);
    let alert = await driver.switchTo().alert();
    await alert.sendKeys(username + Key.TAB + password);
}

exports.input = async function (driver, xpath, value) {
    await console.log('Input <' + value + '>');
    // clear element values
    await driver.findElement(By.xpath(xpath)).sendKeys('');
    // input new values into element
    await driver.findElement(By.xpath(xpath)).sendKeys(value);
};

exports.inputWithClear = async function (driver, xpath, value) {
    await console.log('Input <' + value + '>');
    // clear element values
    // await driver.findElement(By.xpath(xpath)).clear();
    await driver.findElement(By.xpath(xpath)).sendKeys(Key.COMMAND,  "a")
    await driver.findElement(By.xpath(xpath)).sendKeys(Key.DELETE)
    // input new values into element
    await driver.findElement(By.xpath(xpath)).sendKeys(value);
};

exports.inputPicture = async function (driver, xpath, value) {
    await console.log('Input <' + value + '>');
    // input new values into element
    await driver.findElement(By.xpath(xpath)).sendKeys(value);
};

var fs = require('fs');
exports.click = async function (driver, xpath) {
    console.log('Click  <' + xpath + '>');
    await driver.findElement(By.xpath(xpath)).click();
    await this.wait(driver,1000)

};

getText = async function (driver, xpath) {

    let text = await driver.findElement(By.xpath(xpath)).getText();
    console.log('Text <' + text + '>');
    return text;
};
exports.getText = getText;


exports.compareText = async function (driver, xpath, expectText) {
    let actualText = await getText(driver, xpath);
    console.log("Actual Text: " + actualText);
    console.log("Expect Text: " + expectText);
    await expect(actualText).to.equal(expectText);
};

getTitle = async function (driver) {
    let title = await driver.getTitle();
    await console.log('Title <' + title + '>');
    return title;
};
exports.getTitle = getTitle;

exports.compareTitle = async function (driver, expectTitle) {
    let actualTitle = await getTitle(driver);
    console.log("Actual Title: " + actualTitle);
    console.log("Expect Title: " + expectTitle);
    await expect(actualTitle).to.equal(expectTitle);
};

let path = require('path');
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

const date = require('moment');
getDateFormat = function (time, format) {
    let dateFormat;
    if (date(time, "YYYYMMDD HH:mm:ss").isValid()) {
        dateFormat = date(time).format(format);
    } else {
        console.error('The ' + time + ' is not a date format.')
        expect(true).to.equal(false);
    }
    return dateFormat;
};
exports.getDateFormat = getDateFormat;

exports.screenShot = async function (driver, path=__dirname) {

    let targetPath = path.split("/");
    console.log('targetPath: ' + targetPath);
    let dirPath = path.substring(0, path.indexOf(targetPath[targetPath.length - 1]));
    console.log('dirPath: ' + dirPath);

    if (mkdirsSync(dirPath) === true) {
        await driver.takeScreenshot().then(
            function (image) {
                fs.writeFile(path, image, 'base64', function (err) {
                    if (err !== null) {

                        console.log(err);
                    }

                });
            }
        )
    }

};

wait = async function (driver, time) {
    await console.log('Wait <' + time / 1000 + '> seconds');
    await driver.sleep(time);
};
exports.wait = wait;

exports.waitUntilTitle = async function (driver, title, time = 10000) {
    await driver.wait(until.titleIs(title), time);
    await console.log('Wait Title <' + title + '>');
};

exports.scrollIntoView = async  function (driver, targetXpath){
    console.log("scrollIntoView target path: " + targetXpath);
    target = await driver.findElement(By.xpath(targetXpath));

    await driver.executeScript("arguments[0].scrollIntoView();", target)
    await wait(driver, 1000);
};

exports.scrollUp = async  function (driver, targetXpath){
    console.log("scrollUp target path: " + targetXpath);
    target = await driver.findElement(By.xpath(targetXpath));

    await driver.executeScript("arguments[0].scrollIntoView();", target)
    await wait(driver, 1000);
};

exports.waitUntilElement = async function (driver, targetXpath, time = 10000) {
    await driver.wait(until.elementLocated(By.xpath(targetXpath)), time);
    await console.log('Wait Element <' + targetXpath + '>');
};

exports.switchWindow = async function (driver, index = null) {
    let windowHandles = await driver.getAllWindowHandles();
    console.log("windowHandles: "+ windowHandles)
    if (index == null) {
        await driver.switchTo().window(windowHandles.pop());
        await wait(driver, 1000);

    }else{
        await driver.switchTo().window(windowHandles[index]);

        await wait(driver, 1000);
    }

}

exports.refreshPage = async function(driver){
    console.log("refresh page!");
    await driver.navigate().refresh();
}