const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object("https://api.unibee.top");

const addContext = require('mochawesome/addContext');
const {expect} = require("chai");
const {wait, click} = require("../../../CommonStep/Web/Web_Common_Step");
const urlencoded = require("urlencode");
const driver = require("../../../CommonStep/Web/seleniumWebDriver");
const webdriver = require("selenium-webdriver");
const loginPage = require("../../../01_Web/PageObject/LoginPage");
const baseStep = require("../../../CommonStep/Web/Web_Common_Step");
const userPlanPage = require("../../../01_Web/PageObject/UserPlanPage");
const merchantInvoicePage = require("../../../01_Web/PageObject/MerchantInvoicePage");
let request;
let response;
let timeStamp = new Date();
let testData = [];
let testUser = "joshua.yu@wowow.io"


describe('Cancel subscription => Success', function () {
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
                // // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
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
                // // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
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


});

describe('Promo Credit => Success', function () {
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


    it('Case 1: Enable Promo Credits=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds

                ApiReq.EditCreditConfig(API_Env.get().headerSet,
                    {
                        "merchantId": 15671,
                        "type": 2,
                        "currency": "EUR",
                        "payoutEnable": 1,
                        "exchangeRate": 1000
                    }

                    , (res, url, header, bodyObject) => {
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
                        // // token check
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 2: Enable Promo Credits usage=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds

                ApiReq.EditUserCreditAccountConfig(API_Env.get().headerSet,
                    {
                        "id": 2103648,
                        "rechargeEnable": 1,
                        "payoutEnable": 1
                    }

                    , (res, url, header, bodyObject) => {
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
                        // // token check
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 3: Increment Promo Credits=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds

                ApiReq.promoCreditIncrement(API_Env.get().headerSet,
                    {"userId": 2235429245, "currency": "EUR", "amount": 10, "description": "des"}

                    , (res, url, header, bodyObject) => {
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
                        // // token check
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 4: Decrement Promo Credits=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds

                ApiReq.promoCreditDecrement(API_Env.get().headerSet,
                    {"userId": 2235429245, "currency": "EUR", "amount": 5, "description": "des"}

                    , (res, url, header, bodyObject) => {
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
                        // // token check
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 5: Get Credits Transaction list=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds

                ApiReq.getCreditTransactionList(API_Env.get().headerSet,
                    {"userId": 2235429245, "accountType": 2, "count": 10, "page": 0}

                    , (res, url, header, bodyObject) => {
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
                        // // token check
                        expect(resBody.code).to.equal(0);
                        expect(resBody.message).to.equal("");
                        expect( -5 ).to.equal(resBody.data.creditTransactions[0].deltaAmount)
                        expect( -5000 ).to.equal(resBody.data.creditTransactions[0].deltaCurrencyAmount)
                        expect( 10).to.equal(resBody.data.creditTransactions[1].deltaAmount)
                        expect( 10000 ).to.equal(resBody.data.creditTransactions[1].deltaCurrencyAmount)
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



});
