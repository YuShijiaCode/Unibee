let loginPage = require("../../PageObject/LoginPage");
let discountCodePage = require("../../PageObject/MerchantDiscountCodePage");

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/04_discount_code/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");


describe('Add discount code in Merchant Portal, one time use, percentage=> Success', function() {
    this.timeout(100000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });

    it('TC001 - Add discount code in Merchant Portal, one time use, percentage => Success  ', (done) => {
        (async () => {
            try {
                // login 
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await baseStep.input(Driver,  loginPage.email, 'accounts.unibee@unibee.dev');
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver,loginPage.password, 'changeme');
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_login.jpeg');
                await baseStep.click(Driver, loginPage.submitBtn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/02_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.menu_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.new_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,discountCodePage.name, "name"+new Date().getTime());
                await baseStep.input(Driver,discountCodePage.code, "code"+new Date().getTime());
                // await discountCodePage.inputPercentage(Driver, "20");
                await baseStep.input(Driver,discountCodePage.discountPercentage, "20");
                await baseStep.input(Driver,discountCodePage.validityRangeStart, baseStep.getDateFormat(new Date(new Date().getTime()+3600*1000), "YYYY-MM-DD HH:mm:ss"));
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.input(Driver,discountCodePage.validityRangeEnd, baseStep.getDateFormat(new Date(new Date().getTime()+3600*24*30*1000), "YYYY-MM-DD HH:mm:ss"))
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.save_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.waitUntilElement(Driver,discountCodePage.new_discount_code);
                await baseStep.screenShot(Driver,savaPath + '/04_list.jpeg');

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

})

describe('Add discount code in Merchant Portal, Recurring, percentage=> Success', function() {
    this.timeout(100000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });

    it('TC001 - Add discount code in Merchant Portal,Recurring, percentage => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await baseStep.input(Driver,  loginPage.email, 'accounts.unibee@unibee.dev');
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver,loginPage.password, 'changeme');
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_login.jpeg');
                await baseStep.click(Driver, loginPage.submitBtn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/02_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.menu_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.new_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,discountCodePage.name, "name"+new Date().getTime());
                await baseStep.input(Driver,discountCodePage.code, "code"+new Date().getTime());
                await discountCodePage.selectBillingType(Driver, "Recurring")
                // await discountCodePage.inputPercentage(Driver, "20");
                await baseStep.input(Driver,discountCodePage.discountPercentage, "20");
                await baseStep.input(Driver,discountCodePage.validityRangeStart, baseStep.getDateFormat(new Date(new Date().getTime()+3600*1000), "YYYY-MM-DD HH:mm:ss"));
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.input(Driver,discountCodePage.validityRangeEnd, baseStep.getDateFormat(new Date(new Date().getTime()+3600*24*30*1000), "YYYY-MM-DD HH:mm:ss"))
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.save_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.waitUntilElement(Driver,discountCodePage.new_discount_code);
                await baseStep.screenShot(Driver,savaPath + '/04_list.jpeg');

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});

describe('Add discount code in Merchant Portal, one time use, fixed amount=> Success', function() {
    this.timeout(100000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });

    it('TC001 - Add discount code in Merchant Portal, one time use, fixed amount => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await baseStep.input(Driver,  loginPage.email, 'accounts.unibee@unibee.dev');
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver,loginPage.password, 'changeme');
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_login.jpeg');
                await baseStep.click(Driver, loginPage.submitBtn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/02_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.menu_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.new_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,discountCodePage.name, "name"+new Date().getTime());
                await baseStep.input(Driver,discountCodePage.code, "code"+new Date().getTime());
                // await discountCodePage.inputPercentage(Driver, "20");
                await discountCodePage.selectDiscountType(Driver, "Fixed amount")
                await baseStep.input(Driver,discountCodePage.discountAmount, "10");
                await baseStep.input(Driver,discountCodePage.validityRangeStart, baseStep.getDateFormat(new Date(new Date().getTime()+3600*1000), "YYYY-MM-DD HH:mm:ss"));
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.input(Driver,discountCodePage.validityRangeEnd, baseStep.getDateFormat(new Date(new Date().getTime()+3600*24*30*1000), "YYYY-MM-DD HH:mm:ss"))
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.save_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.waitUntilElement(Driver,discountCodePage.new_discount_code);
                await baseStep.screenShot(Driver,savaPath + '/04_list.jpeg');

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

})

describe('Add discount code in Merchant Portal, Recurring, fixed amount=> Success', function() {
    this.timeout(100000);

    beforeEach(function () {
        response = null;
        addContext(this, {
            title: 'StartTime',
            value: {
                StartTime: timeStamp = new Date()
            }
        });
    });
    afterEach(function () {
        if (response) {
            addContext(this, {
                title: 'Request',
                value: {
                    Request: request
                }
            });
            addContext(this, {
                title: 'Response',
                value: {
                    Response: response
                }
            });
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });

    it('TC001 - Add discount code in Merchant Portal, Recurring, fixed amount => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await baseStep.input(Driver,  loginPage.email, 'accounts.unibee@unibee.dev');
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver,loginPage.password, 'changeme');
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_login.jpeg');
                await baseStep.click(Driver, loginPage.submitBtn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/02_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.menu_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.new_discount_code);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,discountCodePage.name, "name"+new Date().getTime());
                await baseStep.input(Driver,discountCodePage.code, "code"+new Date().getTime());
                // await discountCodePage.inputPercentage(Driver, "20");
                await discountCodePage.selectBillingType(Driver, "Recurring")
                await baseStep.wait(Driver, 1000);
                await discountCodePage.selectDiscountType(Driver, "Fixed amount")
                await baseStep.input(Driver,discountCodePage.discountAmount, "10");
                await baseStep.input(Driver,discountCodePage.validityRangeStart, baseStep.getDateFormat(new Date(new Date().getTime()+3600*1000), "YYYY-MM-DD HH:mm:ss"));
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.input(Driver,discountCodePage.validityRangeEnd, baseStep.getDateFormat(new Date(new Date().getTime()+3600*24*30*1000), "YYYY-MM-DD HH:mm:ss"))
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.save_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.waitUntilElement(Driver,discountCodePage.new_discount_code);
                await baseStep.screenShot(Driver,savaPath + '/04_list.jpeg');

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

})



