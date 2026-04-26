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
let testData= [];
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

describe('Create => Success', function () {
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


    it('Case 04: create preview => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.createPreview(API_Env.get().headerSet,
                    {
                        "planId":248,
                        "gatewayId":41,
                        "userId":2235429245,
                        "startIncomplete":true,
                        "user":
                            {
                                "email":"joshua.yu@wowow.io",
                                "countryCode":"EE",
                                "type":1
                            },
                        "vatCountryCode":"AO",
                        "addonParams":[]},(res, url, header) => {
                        request = {
                            URL: url,
                            Headers: header,

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


    it('Case 05: create submit => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.createSubmit(API_Env.get().headerSet,
                    {
                        "planId": 248,
                        "gatewayId": 40,
                        "userId": 2235429245,
                        "quantity": 1,
                        "addonParams": [],
                        "confirmTotalAmount": 2400,
                        "confirmCurrency": "EUR",
                        "startIncomplete": true,
                        "user": {"email": "joshua.yu@wowow.io", "countryCode": "GB", "type": 1},
                        "vatCountryCode": "GB"
                    },(res, url, header) => {
                        request = {
                            URL: url,
                            Headers: header,

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
                        testData['subId'] = resBody.data.subscription.subscriptionId;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: Get invoice list => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getInvoiceList(API_Env.get().headerSet,
                    {
                        "count": 1
                    }, (res, url, header) => {
                        request = {
                            URL: url,
                            Headers: header,

                        };
                        // response = res.body;
                        // Expect response headers：x-app,Content-Type
                        expect(res.statusCode).to.equal(200);
                        const resBody = JSON.parse(res.body);
                        response = resBody;
                        console.log(resBody)
                        // // token check
                        testData["invoiceId"] = resBody.data.invoices[0].invoiceId;
                        // expect(resBody.code).to.equal(0);
                        // expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 07: mark wire transfer invoice success=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.markWireTransferInvoiceSuccess(API_Env.get().headerSet,
                    {"invoiceId": testData["invoiceId"], "reason": "test reason", "TransferNumber": "111"}

                    , (res, url, header, bodyObject) => {
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
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 08: Append subscription trial end=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.appendSubTrialEnd(API_Env.get().headerSet,
                    {
                        "subscriptionId": testData['subId'],
                        // "subscriptionId": "sub20250224Xj13t1GTsilGBd3",
                        "appendTrialEndHour": 24
                    }

                    , (res, url, header, bodyObject) => {
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
                        expect(resBody.message).to.equal("");
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 09: Get subscription list=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getSubList(API_Env.get().headerSet,
                    {
                        "userId": 2235429245,
                        "status": [
                            2
                        ],
                        "currency": "EUR",
                        "planIds": [
                            248
                        ],
                        "productIds": [
                            0
                        ],
                        "count": 1,
                        "page": 0
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
                        expect(testData["subId"]).to.equal(resBody.data.subscriptions[0].subscription.subscriptionId);
                        expect(2235429245).to.equal(resBody.data.subscriptions[0].subscription.userId);
                        expect(248).to.equal(resBody.data.subscriptions[0].subscription.planId);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });


    it('Case 10: Get subscription detail=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getSubDetail(API_Env.get().headerSet,
                    testData['subId']

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
                        expect(testData["subId"]).to.equal(resBody.data.subscription.subscriptionId);
                        expect(2235429245).to.equal(resBody.data.subscription.userId);
                        expect(248).to.equal(resBody.data.subscription.planId);
                        expect(41).to.equal(resBody.data.subscription.gatewayId);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 11: Change Sub gateway=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.changeSubGateway(API_Env.get().headerSet,
                    {
                        "subscriptionId": testData["subId"],
                        "gatewayId": 40
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

    it('Case 12: Get subscription detail=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getSubDetail(API_Env.get().headerSet,
                    testData['subId']

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
                        expect(testData["subId"]).to.equal(resBody.data.subscription.subscriptionId);
                        expect(2235429245).to.equal(resBody.data.subscription.userId);
                        expect(248).to.equal(resBody.data.subscription.planId);
                        expect(40).to.equal(resBody.data.subscription.gatewayId);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });



    it('Case 13: cancel at period=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.cancelSubAtPeriodEnd(API_Env.get().headerSet,
                    {
                        "subscriptionId": testData["subId"],
                        "userId": 2235429245,
                        "productId": 0
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

    it('Case 14: cancel last cancel at period=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.cancelLastCancelSubAtPeriodEnd(API_Env.get().headerSet,
                    {
                        "subscriptionId": testData["subId"],
                        "userId": 2235429245,
                        "productId": 0
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

    it('Case 15: cancel sub immediately=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.cancelSubImmediately(API_Env.get().headerSet,
                {
                    "subscriptionId": testData["subId"],
                    "userId": 2235429245,
                    "productId": 0,
                    "reason": "reason"
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

    it('Case 16: Get user subscription detail=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getUserSubDetail(API_Env.get().headerSet,
                    {
                        "userId": 2235429245
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
                        expect(testData["subId"]).to.equal(resBody.data.subscription.subscriptionId);
                        expect(2235429245).to.equal(resBody.data.user.id);
                        expect(248).to.equal(resBody.data.subscription.planId);
                        expect(40).to.equal(resBody.data.subscription.gatewayId);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});
