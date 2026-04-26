let loginPage = require("../../PageObject/LoginPage");
let merchantSubPage = require("../../PageObject/MerchantSubscriptionPage");
let merchantInvoicePage = require("../../PageObject/MerchantInvoicePage");
let merchantTransactionPage = require("../../PageObject/MerchantTransactionPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
const urlencoded = require('urlencode');

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object(API_Env.get().BasicSet.url);

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait} = require("../../../CommonStep/Web/Web_Common_Step");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/01_Login/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu+7@wowow.io";
describe('Cancel the subscription', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "username": "qa.testing@unibee.dev",
                    "password":"q^GP8JxVx%b"
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(200);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(0);
                    testData["token"] = resBody.data.token;
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: Get User List => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getUserList(API_Env.get().headerSet,urlencoded(testUser),(res, url, header) => {
                    request = {
                        URL: url,
                        Headers: header
                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(200);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    testData["id"] = resBody.data.userAccounts[0].id;
                    console.log("testData[\"id\"]", testData["id"])
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Get subscription => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getSubscription(API_Env.get().headerSet, testData['id'],(res, url, header) => {
                    request = {
                        URL: url,
                        Headers: header
                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(200);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody);
                    testData['subId'] = resBody.data.subscriptions[0].user.subscriptionId;
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 04: cancel sub => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.cancelSubscription(API_Env.get().headerSet,{
                    "subscriptionId": testData['subId']
                },(res, url, header, bodyObject) => {
                    request = JSON.stringify(bodyObject);
                    request = {
                        URL: url,
                        Headers: header,
                        Body: JSON.parse(request)

                    };
                    // response = res.body;
                    // Expect response headers：x-app,Content-Type
                    expect(res.statusCode).to.equal(200);
                    const resBody = JSON.parse(res.body);
                    response = resBody;
                    console.log(resBody)
                    // // token check
                    expect(resBody.code).to.equal(0);
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });
});

describe('Purchase plan=> Success', function() {
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
            addContext(this, {
                title: 'EndTime',
                value: {
                    EndTime: timeStamp = new Date()
                }
            });
        }
    });


    it('TC001 - user purchase a plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, "http://unibee:123456@testing.unibee.top/");
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Premium');
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn,20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver,userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver,userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver,1000);
                await baseStep.input(Driver,userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.wait(Driver, 10000);

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('TC002 - Check Subscription/Invoice/Transaction list in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, "http://unibee:123456@merchant.unibee.top/");
                await baseStep.waitUntilElement(Driver,loginPage.email,20000);
                await loginPage.loginMerchant(Driver, 'qa.testing@unibee.dev', 'q^GP8JxVx%b');
                await baseStep.waitUntilElement(Driver,merchantSubPage.menu_subscription,20000);
                await merchantSubPage.checkRecordSubList(Driver, "Premium","UniBee Premium Plan","€20 /month","Active","");
                // await merchantSubPage.selectSubByPlanName(Driver, "Premium");
                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver, "","€20 (tax: €0)","Paid","No");
                await baseStep.click(Driver, merchantTransactionPage.menu_transaction);
                await merchantTransactionPage.checkRecordTransactionList(Driver, "€20","Succeeded","Payment");
                await baseStep.wait(Driver, 10000000);

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









