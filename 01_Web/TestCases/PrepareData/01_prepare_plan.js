let loginPage = require("../../PageObject/LoginPage");
let planPage = require("../../PageObject/MerchantPlanPage");

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const discountCodePage = require("../../PageObject/MerchantDiscountCodePage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/03_new_plan/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");


describe('case01: create a new plan in Merchant Portal=> Success', function() {
    this.timeout(900000);

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

    it('TC001 - create a new plan => Success  ', (done) => {
        (async () => {
            try {
                // login 
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver,savaPath + '/01_Menu.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.menu_plan);
                await baseStep.click(Driver, planPage.new_plan_btn);
                await baseStep.input(Driver, planPage.plan_name, "Month Plan");
                await baseStep.input(Driver, planPage.plan_description, "Month Plan");
                await baseStep.input(Driver, planPage.price, "20");
                await baseStep.scrollIntoView(Driver, planPage.billable_metrics_label);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.activate_btn);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.back_btn);
                await baseStep.wait(Driver, 2000);
                await planPage.selectPlan(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.publish_btn);
                await baseStep.wait(Driver, 20000);

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

describe('case02: create a one time payment on  in Merchant Portal, => Success', function() {
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

    it('TC001 - create a new plan, currency = JPY => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.menu_plan);
                await baseStep.click(Driver, planPage.new_plan_btn);
                await baseStep.input(Driver, planPage.plan_name, "one time payment" );
                await baseStep.input(Driver, planPage.plan_description, "one time payment");
                // await planPage.selectCurrency(Driver,"JPY")
                await baseStep.wait(Driver, 1000); // aria-activedescendant
                await baseStep.input(Driver, planPage.price, "20");
                await planPage.inputIntervalCount(Driver, 1);
                await planPage.selectPlanType(Driver, "One time payment")
                await baseStep.wait(Driver, 2000);
                await baseStep.scrollIntoView(Driver, planPage.save_btn);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.activate_btn);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.back_btn);
                await baseStep.wait(Driver, 2000);
                await planPage.selectPlan(Driver, "one time payment");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.publish_btn);
                await baseStep.wait(Driver, 20000);
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
                await baseStep.input(Driver,discountCodePage.name, "dis0001");
                await baseStep.input(Driver,discountCodePage.code, "dis0001");
                await discountCodePage.selectDiscountType(Driver, "Fixed amount")
                await baseStep.input(Driver,discountCodePage.discountAmount, "10");
                await baseStep.input(Driver,discountCodePage.validityRangeStart, baseStep.getDateFormat(new Date(new Date().getTime()+3600*1000), "YYYY-MM-DD HH:mm:ss"));
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, discountCodePage.validityRangeOK);
                await baseStep.input(Driver,discountCodePage.validityRangeEnd, baseStep.getDateFormat(new Date(new Date().getTime()+3600*24*300*1000), "YYYY-MM-DD HH:mm:ss"))
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








