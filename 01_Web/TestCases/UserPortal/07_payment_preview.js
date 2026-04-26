let loginPage = require("../../PageObject/LoginPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let userMySubPage = require("../../PageObject/UserMySubPage");
let userPreviewPage = require("../../PageObject/UserOrderPreviewPage");
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
const {wait} = require("../../../CommonStep/Web/Web_Common_Step");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/07_payment_preview/" + baseStep.getDateFormat(new Date(),"YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";

describe('TS001: purchase with a vat number=> Success', function() {
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


    it('case 05 - check order preview page with an vat number => Success  ', (done) => {
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
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_preview.jpeg');
                await userPreviewPage.setCountry(Driver,"United Kingdom");
                await baseStep.wait(Driver, 2000);
                await baseStep.input(Driver, userPreviewPage.vat_number, "GB288305674")
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPreviewPage.discount_code);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.vat_company_address)).to.equal("142 CROMWELL ROAD LONDON GREATER LONDON SW7 4EF GB");
                expect(await baseStep.getText(Driver, userPreviewPage.vat_company_name)).to.equal("WEIO LTD");
                expect(await baseStep.getText(Driver, userPreviewPage.vat_company_code)).to.equal("GB");
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

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});

describe('TS002: Check the different taxes under different countries=> Success', function() {
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


    it('case 05 - Check the different taxes under different countries => Success  ', (done) => {
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
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_preview.jpeg');
                await baseStep.click(Driver, userPreviewPage.bank_card)
                await baseStep.wait(Driver, 3000);
                await userPreviewPage.setCountry(Driver,"Estonia");
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("22 %");
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPreviewPage.wire_transfer);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("22 %");
                await baseStep.wait(Driver,3000);
                // United Arab Emirates
                await baseStep.click(Driver, userPreviewPage.bank_card)
                await baseStep.wait(Driver, 3000);
                await userPreviewPage.setCountry(Driver,"United Arab Emirates");
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("5 %");
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPreviewPage.wire_transfer);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("5 %");
                await baseStep.wait(Driver,3000);

                await baseStep.click(Driver, userPreviewPage.bank_card)
                await baseStep.wait(Driver, 3000);
                await userPreviewPage.setCountry(Driver,"United Kingdom");
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("20 %");
                await baseStep.wait(Driver,3000);
                await baseStep.click(Driver, userPreviewPage.wire_transfer);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.tax)).to.equal("20 %");
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

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});


describe('TS001: purchase with a discount code=> Success', function() {
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


    it('case 05 - check order preview page with an vat number => Success  ', (done) => {
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
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver,savaPath + '/01_preview.jpeg');
                await baseStep.input(Driver, userPreviewPage.discount_code, "dis0001")
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPreviewPage.discount_code_apply);
                await baseStep.wait(Driver, 3000);
                expect(await baseStep.getText(Driver, userPreviewPage.saved)).to.equal("€10");
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

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});






