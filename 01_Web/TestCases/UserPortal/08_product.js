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
let savaPath = __dirname + "/../../Report/Web/ScreenShot/08_product/" + baseStep.getDateFormat(new Date(), "YYYY-MM-DD_HH:mm:ss");
testData = [];
let testUser = "joshua.yu@wowow.io";
describe('case01: Purchase multiple plans=> Success', function () {
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
                    for (let i = 0; i< 3; i++){
                        testData['subId_'+i] = resBody.data.subscriptions[i].subscription.subscriptionId;

                    }
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    for (let i =0; i< 3; i++){
        it('Case 03: cancel sub => Success', (done) => {
            try {
                setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                    ApiReq.cancelSubscription(API_Env.get().headerSet, {
                        "subscriptionId": testData['subId_' + i]
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
    }

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
                await baseStep.wait(Driver, 1000);
                await baseStep.waitUntilElement(Driver, userPlanPage.plan_page_sign, 20000);
                await userPlanPage.selectPlan(Driver, 'Month Plan');
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.screenShot(Driver, savaPath + "/01_Plan_Under_Default.jpeg");
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.screenShot(Driver, savaPath + "/02_PayWithCreditCard.jpeg");
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 20000);
                let actual_success_text = await baseStep.getText(Driver, userPlanPage.payment_success_sign);
                await baseStep.screenShot(Driver, savaPath + "/03_PaySuccess.jpeg");
                await expect("Payment succeeded!").to.equal(actual_success_text);
                await baseStep.wait(Driver, 5000);

                await baseStep.click(Driver, userPlanPage.menu_plan);
                await baseStep.wait(Driver, 1000);
                await userPlanPage.selectProduct(Driver, "Automation Product");
                await userPlanPage.selectPlan(Driver, 'Auto Plan');
                await baseStep.click(Driver, userPlanPage.bank_card);
                await baseStep.screenShot(Driver, savaPath + "/04_Plan_Under_another_tab.jpeg");
                await baseStep.click(Driver, userPlanPage.OK_btn);
                await baseStep.wait(Driver, 1000);
                await baseStep.switchWindow(Driver);
                await baseStep.waitUntilElement(Driver, userPlanPage.change_card_btn, 20000);
                await baseStep.click(Driver, userPlanPage.change_card_btn);
                await baseStep.input(Driver, userPlanPage.card_number, '4242424242424242');
                await baseStep.input(Driver, userPlanPage.card_expiry, '1234');
                await baseStep.wait(Driver, 1000);
                await baseStep.input(Driver, userPlanPage.card_cvc, '567');
                await baseStep.screenShot(Driver, savaPath + "/05_PayWithCreditCard.jpeg");
                await baseStep.wait(Driver, 3000);
                await baseStep.click(Driver, userPlanPage.pay_btn);
                await baseStep.waitUntilElement(Driver, userPlanPage.payment_success_sign, 20000);
                actual_success_text = await baseStep.getText(Driver, userPlanPage.payment_success_sign);
                await baseStep.screenShot(Driver, savaPath + "/06_PaySuccess.jpeg");
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

    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});

describe('case02: Check subscription=> Success', function () {
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
                await baseStep.wait(Driver, 3000);
                await userSubPage.selectProduct(Driver, "Default");
                await baseStep.screenShot(Driver, savaPath + "/07_plan_detail_default.jpeg");
                await expect("Month Plan").to.equal(await baseStep.getText(Driver, userSubPage.plan_name + '[1]'));
                await expect("Active").to.equal(await baseStep.getText(Driver, userSubPage.sub_status+ '[1]'));
                await baseStep.wait(Driver, 2000);
                await userSubPage.selectProduct(Driver, "Automation Product");
                await baseStep.screenShot(Driver, savaPath + "/08_plan_detail_auto.jpeg");
                await expect("Auto Plan").to.equal(await baseStep.getText(Driver, userSubPage.plan_name + '[2]'));
                await expect("Active").to.equal(await baseStep.getText(Driver, userSubPage.sub_status+ '[2]'));
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

describe('case03: Check history list=> Success', function () {
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
                await userSubPage.selectProduct(Driver, "Default");
                await baseStep.wait(Driver, 2000);
                await userSubPage.checkRecordHistoryList(Driver, "Automation Product", "Auto Plan", "Processing");
                await userSubPage.checkRecordHistoryList(Driver, "Default", "Month Plan", "Processing", 2);
                await baseStep.screenShot(Driver, savaPath + "/09_history_list.jpeg");
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

describe('case04: Click link to jump to the corresponding product=> Success', function () {
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
                await baseStep.screenShot(Driver, savaPath + "/10_Link.jpeg");
                await baseStep.wait(Driver, 1000);
                await baseStep.click(Driver, userSubPage.go_to_choose_one);
                await baseStep.wait(Driver, 2000);
                await baseStep.screenShot(Driver, savaPath + "/11_Link_product.jpeg");
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

describe('Cancel all subs=> Success', function () {
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
                    for (let i = 0; i< 3; i++){
                        testData['subId_'+i] = resBody.data.subscriptions[i].subscription.subscriptionId;

                    }
                    done();
                });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    for (let i =0; i< 3; i++){
        it('Case 03: cancel sub => Success', (done) => {
            try {
                setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                    ApiReq.cancelSubscription(API_Env.get().headerSet, {
                        "subscriptionId": testData['subId_' + i]
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
    }


    it('Delay 5 seconds ', (done) => {
        setTimeout(() => {// TODO Need wait about syncTimeAPI second after last operation
            done();
        }, 5000);
    });

});



