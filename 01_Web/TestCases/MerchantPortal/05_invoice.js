let loginPage = require("../../PageObject/LoginPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let userMySubPage = require("../../PageObject/UserMySubPage");
let userInvoicePage = require("../../PageObject/UserInvoicePage");
let merchantInvoicePage = require("../../PageObject/MerchantInvoicePage");
const urlencoded = require('urlencode');

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("http://localhost:8088");

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait, click} = require("../../../CommonStep/Web/Web_Common_Step");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/05_Invoice/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";
describe('TS001: Invoice with Paid=> Success', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "accounts.unibee@unibee.dev",
                    "password":"changeme"
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


    it('case 05 - purchase a plan with stripe in user portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver,userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn,20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver,userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver,userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver,1000);
                await baseStep.input(Driver,userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver,userPlanPage.payment_success_sign,50000);
                let actual_success_text = await  baseStep.getText(Driver,userPlanPage.payment_success_sign);
                await expect("Payment succeeded!").to.equal(actual_success_text);
                await baseStep.wait(Driver,3000);

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });


    it('case 06 - check invoice in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Paid", "stripe", testUser);
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_name)).to.equal("SubscriptionCreate");
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_amount)).to.equal("€24.4 (22% tax incl)");
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Paid");
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.payment_gateway)).to.equal("stripe");



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

describe('TS002: Invoice with Processing and paid (wire transfer)=> Success', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "accounts.unibee@unibee.dev",
                    "password":"changeme"
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

    it('case 05 - purchase a plan with wire transfer => Success  ', (done) => {
        (async () => {
            try {
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.wire_transfer);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,1000);
                await baseStep.click(Driver, userPlanPage.wire_transfer_no_finish);
                await baseStep.wait(Driver,2000);
                await baseStep.click(Driver,userMySubPage.menu_my_subscription);
                let actucl_status = await baseStep.getText(Driver,userMySubPage.sub_status);
                expect("Pending").to.equal(actucl_status);
                await baseStep.wait(Driver,2000);


                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('case 06 - check invoice in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Processing", "Wire Transfer", testUser);
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_name)).to.equal("SubscriptionCreate");
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_amount)).to.equal("€24.4 (22% tax incl)");
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Processing");
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.payment_gateway)).to.equal("Wire Transfer");

                await baseStep.click(Driver, merchantInvoicePage.mark_as_paid_button);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, merchantInvoicePage.transfer_number, "12345");
                await baseStep.input(Driver, merchantInvoicePage.reason, "test reason");
                await baseStep.click(Driver, merchantInvoicePage.mark_as_paid_confirm);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Paid");

                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Paid", "Wire Transfer", testUser);




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

describe('TS003: Invoice with cancelled=> Success', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "accounts.unibee@unibee.dev",
                    "password":"changeme"
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

    it('case 05 - invoice with paid => Success  ', (done) => {
        (async () => {
            try {
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.wire_transfer);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,1000);
                await baseStep.click(Driver, userPlanPage.wire_transfer_no_finish);
                await baseStep.wait(Driver,2000);
                await baseStep.click(Driver,userMySubPage.menu_my_subscription);
                let actucl_status = await baseStep.getText(Driver,userMySubPage.sub_status);
                expect("Pending").to.equal(actucl_status);
                await baseStep.click(Driver,userMySubPage.cancel_sub_button);
                await baseStep.wait(Driver,1000);
                await baseStep.click(Driver,userMySubPage.cancel_confirm_button);
                await baseStep.wait(Driver,2000);


                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('case 06 - check invoice in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Cancelled", "Wire Transfer", testUser);
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_name)).to.equal("SubscriptionCreate");
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_amount)).to.equal("€24.4 (22% tax incl)");
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Cancelled");
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.payment_gateway)).to.equal("Wire Transfer");



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

describe('TS004: refund with stripe=> Success', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "accounts.unibee@unibee.dev",
                    "password":"changeme"
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


    it('case 05 - purchase a plan with stripe in user portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver,userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn,20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver,userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver,userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver,1000);
                await baseStep.input(Driver,userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver,userPlanPage.payment_success_sign,50000);
                let actual_success_text = await  baseStep.getText(Driver,userPlanPage.payment_success_sign);
                await expect("Payment succeeded!").to.equal(actual_success_text);
                await baseStep.wait(Driver,3000);

                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });


    it('case 06 - refund in merchant => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await baseStep.click(Driver, merchantInvoicePage.refund_btn);
                await baseStep.input(Driver, merchantInvoicePage.refund_reason, "refund reason");
                await baseStep.input(Driver, merchantInvoicePage.refund_amount, "1");
                await baseStep.click(Driver, merchantInvoicePage.refund_confirm);
                await baseStep.wait(Driver, 10000);
                await baseStep.refreshPage(Driver);

                await merchantInvoicePage.checkRecordInvoiceList(Driver,
                    "-€1","Credit Note","Refunded", "stripe", testUser);



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

describe('TS005: refund with wire transfer=> Success', function() {
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

    it('Case 01: login => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.login(API_Env.get().headerSet,{
                    "email": "accounts.unibee@unibee.dev",
                    "password":"changeme"
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

    it('case 05 - purchase a plan with wire transfer => Success  ', (done) => {
        (async () => {
            try {
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver, );
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email,20000);
                await loginPage.loginUserPortal(Driver,testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign,20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.wire_transfer);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver,1000);
                await baseStep.click(Driver, userPlanPage.wire_transfer_no_finish);
                await baseStep.wait(Driver,2000);
                await baseStep.click(Driver,userMySubPage.menu_my_subscription);
                let actucl_status = await baseStep.getText(Driver,userMySubPage.sub_status);
                expect("Pending").to.equal(actucl_status);
                await baseStep.wait(Driver,2000);


                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('case 06 - check invoice in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Processing", "Wire Transfer", testUser);
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_name)).to.equal("SubscriptionCreate");
                expect(await baseStep.getText(Driver, merchantInvoicePage.invoice_amount)).to.equal("€24.4 (22% tax incl)");
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Processing");
                expect(await baseStep.getText(Driver, merchantInvoicePage.subscription_id)).not.null;
                expect(await baseStep.getText(Driver, merchantInvoicePage.payment_gateway)).to.equal("Wire Transfer");

                await baseStep.click(Driver, merchantInvoicePage.mark_as_paid_button);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, merchantInvoicePage.transfer_number, "12345");
                await baseStep.input(Driver, merchantInvoicePage.reason, "test reason");
                await baseStep.click(Driver, merchantInvoicePage.mark_as_paid_confirm);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, merchantInvoicePage.status)).to.equal("Paid");

                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,"€24.4\n(tax: €4.4)","Invoice","Paid", "Wire Transfer", testUser);




                done();
            }
            catch (e) {
                done(e);
            }finally {
                await Driver.quit();
            }
        })();
    });

    it('case 07 - refund in merchant => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email,20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await baseStep.click(Driver, merchantInvoicePage.refund_btn);
                await baseStep.input(Driver, merchantInvoicePage.refund_reason, "refund reason");
                await baseStep.input(Driver, merchantInvoicePage.refund_amount, "1");
                await baseStep.click(Driver, merchantInvoicePage.refund_confirm);
                await baseStep.wait(Driver, 2000);
                await baseStep.refreshPage(Driver);

                await merchantInvoicePage.checkRecordInvoiceList(Driver,
                    "-€1","Credit Note","Processing", "Wire Transfer", testUser);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await baseStep.click(Driver, merchantInvoicePage.refund_wire_transfer_confirm);
                await baseStep.input(Driver,merchantInvoicePage.reason, "refunded");
                await baseStep.click(Driver, merchantInvoicePage.mark_as_refunded_confirm );
                await baseStep.wait(Driver, 2000);
                await merchantInvoicePage.checkRecordInvoiceList(Driver,
                    "-€1","Credit Note","Refunded", "Wire Transfer", testUser);



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










