let loginPage = require("../../PageObject/LoginPage");
let userPlanPage = require("../../PageObject/UserPlanPage");
let userMySubPage = require("../../PageObject/UserMySubPage");
let userInvoicePage = require("../../PageObject/UserInvoicePage")
let MerchantSubscriptionPage = require("../../PageObject/MerchantSubscriptionPage")
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
const discountCodePage = require("../../PageObject/MerchantDiscountCodePage");
const userListPage = require("../../PageObject/MerchantUserListPage");
let request;
let response;
let timeStamp = new Date();

let Driver;
let savaPath = __dirname + "/../../Report/Web/ScreenShot/08_Subscription/" + baseStep.getDateFormat(new Date(), "YYYY-MM-DD_HH:mm:ss");
let testData = [];
let testUser = "joshua.yu@wowow.io";



describe('case01: cancel subscription in merchant=> Success', function () {
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


    it('case 05 - select a plan  with Succeeded => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver, userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 200000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 50000);
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

    it('case 06 - cancel sub in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, MerchantSubscriptionPage.menu_subscription)
                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.end_subscription);
                await baseStep.click(Driver, MerchantSubscriptionPage.end_immediately);
                await baseStep.screenShot(Driver, savaPath + '/01_cancel_sub.png');
                await baseStep.click(Driver, MerchantSubscriptionPage.end_OK_btn);
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver, savaPath + '/02_cancel_result.png');
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.sub_status)).to.equal("Cancelled");
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

describe('case02: change subscription in merchant=> Success', function () {
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


    it('case 05 - select a plan  with Succeeded => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver, userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 200000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 50000);
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

    it('case 06 - change sub in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver,)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, MerchantSubscriptionPage.menu_subscription)
                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.sub_status)).to.equal("Active");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.change_sub_btn);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectTargetPlan(Driver, "Update Plan");
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, MerchantSubscriptionPage.change_OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/03_change_sub.png');
                await baseStep.click(Driver, MerchantSubscriptionPage.change_confirm);
                await baseStep.wait(Driver, 10000);
                await baseStep.screenShot(Driver, savaPath + '/04_change_result.png');
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.sub_plan)).to.equal("Update Plan");
                await baseStep.wait(Driver, 2000);
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

describe('case03: change Due date=> Success', function () {
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


    it('case 05 - select a plan  with Succeeded => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver, userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 200000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 50000);
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

    it('case 06 - change due date => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, MerchantSubscriptionPage.menu_subscription)
                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await MerchantSubscriptionPage.setDueDate(Driver, 3);
                await baseStep.wait(Driver, 1000);
                await baseStep.screenShot(Driver, savaPath + '/05_change_due_date.png');
                await baseStep.click(Driver, MerchantSubscriptionPage.due_date_OK_btn);
                await baseStep.wait(Driver, 2000);
                let current = new Date(new Date().setMonth(new Date().getMonth() + 1));
                let expectDate = baseStep.getDateFormat(new Date(new Date(current).setDate(new Date(current).getDate() + 3)), "YYYY-MMM-DD");
                await baseStep.screenShot(Driver, savaPath + '/06_change_due_date_result.png');
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.change_due_date_info)).to.equal("+3 days → " + expectDate);
                await baseStep.wait(Driver, 5000);
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

describe('case04: Pending to incomplete=> Success', function () {
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
                    testData['subId'] = resBody.data.subscriptions[0].subscription.subscriptionId;
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

    it('case 05 - purchase a plan with wire transfer => Success  ', (done) => {
        (async () => {
            try {
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
                await baseStep.click(Driver, userPlanPage.wire_transfer);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userPlanPage.wire_transfer_no_finish);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, userMySubPage.menu_my_subscription);
                let actucl_status = await baseStep.getText(Driver, userMySubPage.sub_status);
                expect("Pending").to.equal(actucl_status);
                await baseStep.wait(Driver, 2000);



                done();
            } catch (e) {
                done(e);
            } finally {
                await Driver.quit();
            }
        })();
    });

    it('case 06 - check sub in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.sub_status)).to.equal("Pending");
                await baseStep.screenShot(Driver, savaPath + '/07_pending.png');
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.mark_as_incomplete);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectDate(Driver, 1);
                await baseStep.click(Driver, MerchantSubscriptionPage.yes_btn);
                await baseStep.wait(Driver, 2000);
                await expect(await baseStep.getText(Driver, MerchantSubscriptionPage.sub_status)).to.equal("Incomplete");
                await baseStep.screenShot(Driver, savaPath + '/08_incomplete.png');
                await baseStep.wait(Driver, 2000);
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

describe('case05: change account info in subscription=> Success', function () {
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
                    testData['subId'] = resBody.data.subscriptions[0].subscription.subscriptionId;
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

    it('case 05 - select a plan  with Succeeded => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openUserUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.user_email, 20000);
                await loginPage.loginUserPortal(Driver, testUser)
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.waitUntilElement(Driver, userPlanPage.bank_card, 20000);
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 5000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 200000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 50000);
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

    it('case 06 - change account info in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.account_tab);
                await baseStep.wait(Driver, 2000);
                await baseStep.inputWithClear(Driver, userListPage.account_billing_address, "update address" + new Date().getTime());
                await baseStep.screenShot(Driver, savaPath + "/09_Edit_result.png");
                await baseStep.scrollIntoView(Driver, userListPage.save_btn);
                await baseStep.click(Driver, userListPage.save_btn);
                await baseStep.wait(Driver, 1000);

                await baseStep.wait(Driver, 2000);
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

describe('case06: create an invoice in subscription=> Success', function () {
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
                    testData['subId'] = resBody.data.subscriptions[0].subscription.subscriptionId;
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

    it('case 04 - change account info in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, MerchantSubscriptionPage.menu_subscription);
                await baseStep.wait(Driver, 2000);
                await MerchantSubscriptionPage.selectSubByPlanName(Driver, "Month Plan");
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.Invoices_tab);
                await baseStep.wait(Driver, 2000);
                await baseStep.click(Driver, MerchantSubscriptionPage.create_invoice_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, MerchantSubscriptionPage.tax_rate, "0");
                await baseStep.input(Driver, MerchantSubscriptionPage.invoice_title, "auto create");
                await baseStep.input(Driver, MerchantSubscriptionPage.item_description, "auto create description");
                await baseStep.input(Driver, MerchantSubscriptionPage.amount, "20");
                await baseStep.screenShot(Driver, savaPath + "/10_create_invoice.png");
                await baseStep.click(Driver, MerchantSubscriptionPage.create_invoice_create_btn);

                await baseStep.wait(Driver, 2000);
                done();
            } catch (e) {
                done(e);
            } finally {
                await Driver.quit();
            }
        })();
    });

    it('case 05 - check invoice in merchant portal => Success  ', (done) => {
        (async () => {
            try {
                // login
                Driver = driver.getDriver(webdriver, 'chrome');
                // Check Url
                await loginPage.openMerchantUrl(Driver);
                const currentUrl = await Driver.getCurrentUrl();
                console.log('当前网址:', currentUrl);
                await baseStep.waitUntilElement(Driver, loginPage.email, 20000);
                await loginPage.loginMerchant(Driver)
                await baseStep.wait(Driver, 1000);

                await baseStep.click(Driver, merchantInvoicePage.menu_Invoice);
                await baseStep.screenShot(Driver, savaPath + '/11_InvoiceDetail.jpeg');
                await merchantInvoicePage.checkRecordInvoiceList(Driver, "€20\n(tax: €0)", "Invoice", "Processing", "Stripe", testUser);
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














