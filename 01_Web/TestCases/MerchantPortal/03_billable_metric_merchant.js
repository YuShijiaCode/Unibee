let loginPage = require("../../PageObject/LoginPage");
let billableMetricPage = require("../../PageObject/MerchantBillableMetricPage");

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
let savaPath = __dirname + "/../../Report/Web/ScreenShot/03_billable_metric/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");


describe('Add billable metric in Merchant Portal, Aggregation Type = count=> Success', function() {
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

    it('TC001 - add billable metric ,Aggregation Type = count => Success  ', (done) => {
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
                await baseStep.click(Driver, billableMetricPage.menu_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, billableMetricPage.new_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,billableMetricPage.metric_name, "name"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_code, "code"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_description, "description"+new Date().getTime());
                await billableMetricPage.selectAggregationType(Driver, "count");
                await baseStep.click(Driver, billableMetricPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_info.jpeg');
                await baseStep.wait(Driver, 3000);
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

describe('Add billable metric in Merchant Portal, Aggregation Type = count unique=> Success', function() {
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

    it('TC001 - add billable metric ,Aggregation Type = count unique => Success  ', (done) => {
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
                await baseStep.click(Driver, billableMetricPage.menu_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, billableMetricPage.new_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,billableMetricPage.metric_name, "name"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_code, "code"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_description, "description"+new Date().getTime());
                await billableMetricPage.selectAggregationType(Driver, "count unique");
                await baseStep.input(Driver, billableMetricPage.aggregation_property, "100");
                await baseStep.click(Driver, billableMetricPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_info.jpeg');
                await baseStep.wait(Driver, 3000);
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

describe('Add billable metric in Merchant Portal, Aggregation Type = latest=> Success', function() {
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

    it('TC001 - add billable metric ,Aggregation Type = latest => Success  ', (done) => {
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
                await baseStep.click(Driver, billableMetricPage.menu_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, billableMetricPage.new_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,billableMetricPage.metric_name, "name"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_code, "code"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_description, "description"+new Date().getTime());
                await billableMetricPage.selectAggregationType(Driver, "latest");
                await baseStep.input(Driver, billableMetricPage.aggregation_property, "100");
                await baseStep.click(Driver, billableMetricPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_info.jpeg');
                await baseStep.wait(Driver, 3000);
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

describe('Add billable metric in Merchant Portal, Aggregation Type = max=> Success', function() {
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

    it('TC001 - add billable metric ,Aggregation Type = max => Success  ', (done) => {
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
                await baseStep.click(Driver, billableMetricPage.menu_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, billableMetricPage.new_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,billableMetricPage.metric_name, "name"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_code, "code"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_description, "description"+new Date().getTime());
                await billableMetricPage.selectAggregationType(Driver, "max");
                await baseStep.input(Driver, billableMetricPage.aggregation_property, "100");
                await baseStep.click(Driver, billableMetricPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_info.jpeg');
                await baseStep.wait(Driver, 3000);
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

describe('Add billable metric in Merchant Portal, Aggregation Type = sum=> Success', function() {
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

    it('TC001 - add billable metric ,Aggregation Type = sum => Success  ', (done) => {
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
                await baseStep.click(Driver, billableMetricPage.menu_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, billableMetricPage.new_billable_metric);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver,billableMetricPage.metric_name, "name"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_code, "code"+new Date().getTime());
                await baseStep.input(Driver,billableMetricPage.metric_description, "description"+new Date().getTime());
                await billableMetricPage.selectAggregationType(Driver, "sum");
                await baseStep.input(Driver, billableMetricPage.aggregation_property, "100");
                await baseStep.click(Driver, billableMetricPage.save_btn);
                await baseStep.screenShot(Driver,savaPath + '/03_info.jpeg');
                await baseStep.wait(Driver, 3000);
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




