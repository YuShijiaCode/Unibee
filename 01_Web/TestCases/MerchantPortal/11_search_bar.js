let loginPage = require("../../PageObject/LoginPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let userMySubPage = require("../../PageObject/UserMySubPage");
let userInvoicePage = require("../../PageObject/UserInvoicePage")
let merchantTransactionPage = require("../../PageObject/MerchantTransactionPage")
let merchantMyAccount = require("../../PageObject/MerchantMyAccountPage")
let searchBarPage = require("../../PageObject/MerchantSearchBarPage")
let userListPage = require("../../PageObject/MerchantUserListPage")
const urlencoded = require('urlencode');

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("https://api.unibee.top");

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait} = require("../../../CommonStep/Web/Web_Common_Step");
const merchantInvoicePage = require("../../PageObject/MerchantInvoicePage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/11_search_bar/" + baseStep.getDateFormat(new Date(), "YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";
describe('case01: logout=> Success', function () {
    this.timeout(9000000);

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
        }
        addContext(this, {
            title: 'EndTime',
            value: {
                EndTime: timeStamp = new Date()
            }
        });

    });

    it('case 01 - logout => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                await loginPage.loginMerchant(Driver);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + '/01_Login.jpeg');
                await baseStep.click(Driver, searchBarPage.logout_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/02_Logout.jpeg');
                expect(await loginPage.email).to.be.exist

                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case02: search bar => Success', function () {
    this.timeout(9000000);

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
        }
        addContext(this, {
            title: 'EndTime',
            value: {
                EndTime: timeStamp = new Date()
            }
        });

    });

    it('case 02 - search invoice => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                await loginPage.loginMerchant(Driver);
                await baseStep.wait(Driver, 3000);
                await baseStep.waitUntilElement(Driver,searchBarPage.search_bar, 20000 )
                await baseStep.input(Driver, searchBarPage.search_bar, "81728528183713");
                await baseStep.click(Driver, searchBarPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/03_Search.jpeg');
                await baseStep.click(Driver, searchBarPage.first_record_under_invoice);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + '/04_invoice_opened.jpeg');
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_name)).to.equal("SubscriptionCreate");
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_amount)).to.equal("€24 (20% tax incl)");
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Paid");
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.payment_gateway)).to.equal("Stripe");

                await baseStep.click(Driver, searchBarPage.search_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, searchBarPage.first_record_under_customer);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/05_userInfo_opened.jpeg');
                expect(await baseStep.getText(Driver, userListPage.info_email)).to.equal(testUser);
                await baseStep.wait(Driver, 1000);

                done();
            } catch (e) {
                done(e);
            } finally {
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

describe('case03: search bar => Success', function () {
    this.timeout(9000000);

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
        }
        addContext(this, {
            title: 'EndTime',
            value: {
                EndTime: timeStamp = new Date()
            }
        });

    });

    it('case 01 - search user email => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                await loginPage.loginMerchant(Driver);
                await baseStep.wait(Driver, 3000);
                await baseStep.input(Driver, searchBarPage.search_bar, testUser);
                await baseStep.click(Driver, searchBarPage.search_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/03_Search.jpeg');
                await baseStep.click(Driver, searchBarPage.first_record_under_invoice);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + '/04_invoice_opened.jpeg');
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;

                await baseStep.click(Driver, searchBarPage.search_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, searchBarPage.first_record_under_customer);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/05_userInfo_opened.jpeg');
                expect(await baseStep.getText(Driver, userListPage.info_email)).to.equal(testUser);
                await baseStep.wait(Driver, 1000);

                done();
            } catch (e) {
                done(e);
            } finally {
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










