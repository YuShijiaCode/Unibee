let loginPage = require("../../PageObject/LoginPage");
let planPage = require("../../PageObject/MerchantPlanPage");

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
let savaPath = __dirname + "/../../Report/Web/ScreenShot/02_new_plan/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");


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
                await baseStep.compareText(Driver, planPage.plan_name_label, "Plan Name");
                await baseStep.input(Driver, planPage.plan_name, "AutomationTest" + new Date().getTime() );
                await baseStep.compareText(Driver, planPage.plan_description_label, "Plan Description");
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                await baseStep.compareText(Driver, planPage.status_label, "Status");
                await baseStep.compareText(Driver, planPage.is_published_label, "Is Published");
                await baseStep.compareText(Driver, planPage.currency_label, "Currency");
                await baseStep.compareText(Driver, planPage.price_label, "Price");
                await baseStep.input(Driver, planPage.price, "20");
                await baseStep.compareText(Driver, planPage.intervalUnit_label, "Interval Unit");
                await baseStep.compareText(Driver, planPage.intervalCount_label, "Interval Count");
                await baseStep.input(Driver, planPage.intervalCount,  "1");
                await baseStep.compareText(Driver, planPage.plan_type_label, "Plan Type");
                await baseStep.compareText(Driver, planPage.add_ons_label, "Add-ons");
                await baseStep.compareText(Driver, planPage.onetimeAddonIds_label, "One-time-payment add-on");
                await baseStep.compareText(Driver, planPage.plan_type_label, "Plan Type");
                await baseStep.scrollIntoView(Driver, planPage.billable_metrics_label);
                await baseStep.compareText(Driver, planPage.allow_trial_label, "Allow Trial");
                await baseStep.compareText(Driver, planPage.trial_price_label, "Trial Price");
                await baseStep.compareText(Driver, planPage.trial_length_label, "Trial length");
                await baseStep.compareText(Driver, planPage.trial_requires_bank_card_info_label, "Trial requires bank card info");
                await baseStep.compareText(Driver, planPage.auto_renew_after_trial_end_label, "Auto renew after trial end");
                await baseStep.compareText(Driver, planPage.billable_metrics_label, "Billable Metrics");
                await baseStep.compareText(Driver, planPage.Custom_data_label, "Custom data (JSON string)");
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);

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

describe('case02: create a new plan in Merchant Portal, currency = USD=> Success', function() {
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

    it('TC001 - create a new plan, currency = USD => Success  ', (done) => {
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
                await baseStep.input(Driver, planPage.plan_name, "AutomationTest" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                await planPage.selectCurrency(Driver,"USD")
                await baseStep.wait(Driver, 1000); // aria-activedescendant
                await baseStep.input(Driver, planPage.price, "20");
                // await baseStep.input(Driver, planPage.intervalCount,  "1");
                await planPage.inputIntervalCount(Driver, 2);
                await baseStep.scrollIntoView(Driver, planPage.billable_metrics_label);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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

describe('case03: create a new plan in Merchant Portal, currency = JPY=> Success', function() {
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
                await baseStep.input(Driver, planPage.plan_name, "AutomationTest" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                await planPage.selectCurrency(Driver,"JPY")
                await baseStep.wait(Driver, 1000); // aria-activedescendant
                await baseStep.input(Driver, planPage.price, "20");
                await planPage.inputIntervalCount(Driver, 2);
                await baseStep.scrollIntoView(Driver, planPage.allow_trial);
                await baseStep.click(Driver,planPage.allow_trial);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,planPage.trial_length, "1");
                await baseStep.click(Driver,planPage.trial_requires_bank_card_info);
                await baseStep.wait(Driver, 1000);
                await baseStep.scrollIntoView(Driver, planPage.save_btn);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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

describe('case04: create a new plan in Merchant Portal, Allow Trial = True billing info and auto renew = false => Success', function() {
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
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_Menu.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.menu_plan);
                await baseStep.click(Driver, planPage.new_plan_btn);
                await baseStep.input(Driver, planPage.plan_name, "AutomationTest" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                await planPage.selectCurrency(Driver,"EUR")
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, planPage.price, "20");
                await planPage.inputIntervalCount(Driver, 2);
                await baseStep.scrollIntoView(Driver, planPage.allow_trial);
                await baseStep.click(Driver,planPage.allow_trial);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,planPage.trial_length, "1");
                await baseStep.click(Driver,planPage.auto_renew_after_trial_end);
                await baseStep.wait(Driver, 1000);
                await baseStep.scrollIntoView(Driver, planPage.save_btn);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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

describe('case05: create a new plan in Merchant Portal,  Allow Trial = True billing info and auto renew = false, price>0=> Success', function() {
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
                await baseStep.input(Driver, planPage.plan_name, "AutomationTest" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                await planPage.selectCurrency(Driver,"JPY")
                await baseStep.wait(Driver, 1000); // aria-activedescendant
                await baseStep.input(Driver, planPage.price, "20");
                await planPage.inputIntervalCount(Driver, 2);
                await baseStep.scrollIntoView(Driver, planPage.allow_trial);
                await baseStep.click(Driver,planPage.allow_trial);
                await baseStep.wait(Driver, 1000);
                await planPage.inputTrialPrice(Driver,"20");
                await baseStep.input(Driver,planPage.trial_length, "1");
                await baseStep.click(Driver,planPage.trial_requires_bank_card_info);
                await baseStep.wait(Driver, 1000);
                await baseStep.scrollIntoView(Driver, planPage.save_btn);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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


describe('case05: create a add on  in Merchant Portal, => Success', function() {
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
                await baseStep.input(Driver, planPage.plan_name, "AutomationTestAddon" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
                // await planPage.selectCurrency(Driver,"JPY")
                await baseStep.wait(Driver, 1000); // aria-activedescendant
                await baseStep.input(Driver, planPage.price, "20");
                await planPage.inputIntervalCount(Driver, 1);
                await planPage.selectPlanType(Driver, "Addon")
                await baseStep.scrollIntoView(Driver, planPage.save_btn);
                await baseStep.click(Driver, planPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/02_save.jpeg');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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

describe('case06: create a one time payment on  in Merchant Portal, => Success', function() {
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
                await baseStep.input(Driver, planPage.plan_name, "AutomationTestAddon" + new Date().getTime() );
                await baseStep.input(Driver, planPage.plan_description, "AutomationTest description");
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
                await baseStep.click(Driver, planPage.delete_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_delete.jpeg');
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, planPage.confirm_delete_btn);
                await baseStep.wait(Driver, 1000);
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






