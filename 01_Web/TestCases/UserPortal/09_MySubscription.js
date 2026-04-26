let loginPage = require("../../PageObject/LoginPage");
let planPage = require("../../PageObject/MerchantPlanPage");

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const driver = require('../../../CommonStep/Web/seleniumWebDriver');
const baseStep = require('../../../CommonStep/Web/Web_Common_Step');

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("https://api.unibee.top");

const urlencoded = require("urlencode");
const userPlanPage = require("../../PageObject/UserPlanPage");
const userSubPage = require("../../PageObject/UserMySubPage");
let request;
let response;
let timeStamp = new Date();



let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/09_MySubscription" + baseStep.getDateFormat(new Date(), "YYYY-MM-DD_HH:mm:ss");
testData = [];
let testUser = "joshua.yu@wowow.io";
describe('case01: Click link to jump to the corresponding product=> Success', function () {
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

    it('case 01 - check subscription list  => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver,);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.menu_my_subscription);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.click(Driver, userSubPage.menu_my_subscription);
                await baseStep.wait(Driver, 3000);
                await userSubPage.selectProduct(Driver, "Link Product");
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver, savaPath + "/01_Link.jpeg");
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.go_to_choose_one);
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver, savaPath + "/02_Link_product.jpeg");
                expect("true").to.equal(await userSubPage.isProductSelected(Driver, "Link Product"));


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

describe('case02: change plan=> Success', function () {
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



    it('Case 01:  Get User List => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getUserList(API_Env.get().headerSet, urlencoded(testUser), (res, url, header) => {
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

    it('Case 02: Get subscription => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getSubscription(API_Env.get().headerSet, testData['id'], (res, url, header) => {
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

    it('Case 03: cancel sub => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.cancelSubscription(API_Env.get().headerSet, {
                    "subscriptionId": testData['subId']
                }, (res, url, header, bodyObject) => {
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

    it('case 04 - user purchase a plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver,);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 20000);
                let actual_success_text = await baseStep.getText(Driver, userPlanPage.payment_success_sign);
                await expect("Payment succeeded!").to.equal(actual_success_text);
                await baseStep.wait(Driver, 3000);
                done();
            } catch (e) {
                done(e);
            } finally {
                await Driver.quit();
            }
        })();
    });

    it('case 05 - change plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver,);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.menu_my_subscription);
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userSubPage.change_plan_btn);

                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Update Plan');
                await baseStep.screenShot(Driver, savaPath + "/03_Update_plan.png");
                await baseStep.click(Driver, userPlanPage.OK_confirm);
                await baseStep.wait(Driver, 3000);
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

describe('case03: cancel plan and resume=> Success', function () {
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



    it('Case 01:  Get User List => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getUserList(API_Env.get().headerSet, urlencoded(testUser), (res, url, header) => {
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

    it('Case 02: Get subscription => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.getSubscription(API_Env.get().headerSet, testData['id'], (res, url, header) => {
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

    it('Case 03: cancel sub => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                ApiReq.cancelSubscription(API_Env.get().headerSet, {
                    "subscriptionId": testData['subId']
                }, (res, url, header, bodyObject) => {
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

    it('case 04 - user purchase a plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver,);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 20000);
                let actual_success_text = await baseStep.getText(Driver, userPlanPage.payment_success_sign);
                await expect("Payment succeeded!").to.equal(actual_success_text);
                await baseStep.wait(Driver, 3000);
                done();
            } catch (e) {
                done(e);
            } finally {
                await Driver.quit();
            }
        })();
    });

    it('case 05 - cancel plan => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver,);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.menu_my_subscription);
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userSubPage.End_Subscription_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.OK_btn);
                await baseStep.screenShot(Driver, savaPath + "/04_cancel_plan.png");
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userSubPage.resume_btn);
                await baseStep.wait(Driver, 3000);
                await baseStep.screenShot(Driver, savaPath + "/05_resume_plan.png");
                await baseStep.click(Driver, userPlanPage.OK_confirm);
                await baseStep.wait(Driver, 3000);
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




