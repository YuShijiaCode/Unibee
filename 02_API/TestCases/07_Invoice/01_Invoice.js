const API_Object = require("../../../CommonStep/API/API_Object");
const API_Env = require("../../../CommonStep/API/API_Env");
const ApiReq = new API_Object();

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


describe('Positive Check :Invoice with wire_transfer=> Success', function () {
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


    // it('Case 01: Get invoice list => Success', (done) => {
    //     try {
    //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
    //             let tmpTime = new Date().getTime();
    //             ApiReq.getInvoiceList(API_Env.get().headerSet,
    //                 {
    //                     "count": 1
    //                 }, (res, url, header) => {
    //                     request = {
    //                         URL: url,
    //                         Headers: header,
    //
    //                     };
    //                     // response = res.body;
    //                     // Expect response headers：x-app,Content-Type
    //                     expect(res.statusCode).to.equal(200);
    //                     const resBody = JSON.parse(res.body);
    //                     response = resBody;
    //                     console.log(resBody)
    //                     // // token check
    //                     // expect(resBody.code).to.equal(0);
    //                     // expect(resBody.message).to.equal("");
    //                     done();
    //                 });
    //         }, 1000);
    //     } catch (e) {
    //         done(e);
    //     }
    // });
    //
    // it('Case 02: new invoice for wire transfer => Success', (done) => {
    //     try {
    //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
    //             let tmpTime = new Date().getTime();
    //             ApiReq.newInvoice(API_Env.get().headerSet,
    //                 {
    //                     "userId": 2235429245,
    //                     "taxPercentage": 2000,
    //                     "gatewayId": 41, // wire_transfer
    //                     "currency": "EUR",
    //                     "name": "autoInvoice",
    //                     "lines": [
    //                         {
    //                             "unitAmountExcludingTax": 10000,
    //                             "name": "Month Plan",
    //                             "description": "1 * Month Plan (2024-11-28-2024-12-28)",
    //                             "quantity": 1
    //                         }
    //                     ],
    //                     "finish": true
    //                 }, (res, url, header, bodyObject) => {
    //                     request = JSON.stringify(bodyObject);
    //                     request = {
    //                         URL: url,
    //                         Headers: header,
    //                         Body: JSON.parse(request)
    //
    //                     };
    //                     // response = res.body;
    //                     // Expect response headers：x-app,Content-Type
    //                     expect(res.statusCode).to.equal(200);
    //                     const resBody = JSON.parse(res.body);
    //                     response = resBody;
    //                     console.log(resBody)
    //                     // // token check
    //                     expect(resBody.code).to.equal(0);
    //                     expect(resBody.message).to.equal("");
    //                     testData["invoiceId"] = resBody.data.invoice.invoiceId;
    //
    //                     done();
    //                 });
    //         }, 1000);
    //     } catch (e) {
    //         done(e);
    //     }
    // });

    it('Case 01: create preview => Success', (done) => {
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

    it('Case 02: create submit => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.createSubmit(API_Env.get().headerSet,
                    {
                        "planId": 248,
                        "gatewayId": 41,
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: Get invoice list => Success', (done) => {
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

    it('Case 04: mark wire transfer invoice success=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.markWireTransferInvoiceSuccess(API_Env.get().headerSet,
                    {"invoiceId": testData["invoiceId"], "reason": "222", "TransferNumber": "111"}

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

    it('Case 05: mark invoice refund=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.createInvoiceRefund(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["invoiceId"],
                        "refundNo": new Date().getTime(),
                        "refundAmount": 100,
                        "reason": "refund"
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
                        testData["refundId"] = resBody.data.refund.invoiceId;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 06: mark invoice refund success=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.markInvoiceRefundSuccess(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["refundId"],
                        "reason": "refund success"
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

});

describe('Positive Check : Create invoice manually=> Success', function () {
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


    // it('Case 01: Get invoice list => Success', (done) => {
    //     try {
    //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
    //             let tmpTime = new Date().getTime();
    //             ApiReq.getInvoiceList(API_Env.get().headerSet,
    //                 {
    //                     "count": 1
    //                 }, (res, url, header) => {
    //                     request = {
    //                         URL: url,
    //                         Headers: header,
    //
    //                     };
    //                     // response = res.body;
    //                     // Expect response headers：x-app,Content-Type
    //                     expect(res.statusCode).to.equal(200);
    //                     const resBody = JSON.parse(res.body);
    //                     response = resBody;
    //                     console.log(resBody)
    //                     // // token check
    //                     // expect(resBody.code).to.equal(0);
    //                     // expect(resBody.message).to.equal("");
    //                     done();
    //                 });
    //         }, 1000);
    //     } catch (e) {
    //         done(e);
    //     }
    // });
    //
    // it('Case 02: new invoice for wire transfer => Success', (done) => {
    //     try {
    //         setTimeout(() => {//Wait syncTimeAPI*1000 seconds
    //             let tmpTime = new Date().getTime();
    //             ApiReq.newInvoice(API_Env.get().headerSet,
    //                 {
    //                     "userId": 2235429245,
    //                     "taxPercentage": 2000,
    //                     "gatewayId": 41, // wire_transfer
    //                     "currency": "EUR",
    //                     "name": "autoInvoice",
    //                     "lines": [
    //                         {
    //                             "unitAmountExcludingTax": 10000,
    //                             "name": "Month Plan",
    //                             "description": "1 * Month Plan (2024-11-28-2024-12-28)",
    //                             "quantity": 1
    //                         }
    //                     ],
    //                     "finish": true
    //                 }, (res, url, header, bodyObject) => {
    //                     request = JSON.stringify(bodyObject);
    //                     request = {
    //                         URL: url,
    //                         Headers: header,
    //                         Body: JSON.parse(request)
    //
    //                     };
    //                     // response = res.body;
    //                     // Expect response headers：x-app,Content-Type
    //                     expect(res.statusCode).to.equal(200);
    //                     const resBody = JSON.parse(res.body);
    //                     response = resBody;
    //                     console.log(resBody)
    //                     // // token check
    //                     expect(resBody.code).to.equal(0);
    //                     expect(resBody.message).to.equal("");
    //                     testData["invoiceId"] = resBody.data.invoice.invoiceId;
    //
    //                     done();
    //                 });
    //         }, 1000);
    //     } catch (e) {
    //         done(e);
    //     }
    // });

    it('Case 01: create new invoice => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.newInvoice(API_Env.get().headerSet,
                    {
                        "userId": 2235429245,
                        "taxPercentage": 20,
                        "gatewayId": 40,
                        "currency": "EUR",
                        "name": "auto invoice",
                        "lines": [
                            {
                                "unitAmountExcludingTax": 2000,
                                "name": "Month Plan",
                                "description": "auto invoice",
                                "quantity": 1
                            }
                        ],
                        "finish": false
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
                        testData["invoiceId"] = resBody.data.invoice.invoiceId;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: edit invoice  => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.editInvoice(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["invoiceId"],
                        "taxPercentage": 2000,
                        "gatewayId": 40,
                        "currency": "EUR",
                        "name": "auto update",
                        "lines": [
                            {
                                "unitAmountExcludingTax": 4000,
                                "name": "Month Plan",
                                "description": "auto update",
                                "quantity": 1
                            }
                        ],
                        "finish": false
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 03: delete invoice => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteInvoice(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["invoiceId"],
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});

describe('Positive Check : Get invoice Detail=> Success', function () {
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



    it('Case 01: create new invoice => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                // API_Env.get().headerSet.Authorization = "Bearer " + testData["token"];
                ApiReq.newInvoice(API_Env.get().headerSet,
                    {
                        "userId": 2235429245,
                        "taxPercentage": 2000,
                        "gatewayId": 40,
                        "currency": "EUR",
                        "name": "auto invoice",
                        "lines": [
                            {
                                "unitAmountExcludingTax": 2000,
                                "name": "Month Plan",
                                "description": "auto invoice",
                                "quantity": 1
                            }
                        ],
                        "finish": false
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
                        testData["invoiceId"] = resBody.data.invoice.invoiceId;
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

    it('Case 02: get invoice detail=> Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.getInvoiceDetail(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["invoiceId"],
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
                        expect(2235429245).to.equal(resBody.data.invoice.userId);
                        expect('auto invoice').to.equal(resBody.data.invoice.invoiceName);
                        expect('auto invoice').to.equal(resBody.data.invoice.productName);
                        expect(testData["invoiceId"]).to.equal(resBody.data.invoice.invoiceId);
                        expect('EUR').to.equal(resBody.data.invoice.currency);
                        expect(2000).to.equal(resBody.data.invoice.totalAmountExcludingTax);
                        expect(2000).to.equal(resBody.data.invoice.subscriptionAmountExcludingTax);
                        expect(2000).to.equal(resBody.data.invoice.taxPercentage);
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });
    it('Case 03: delete invoice => Success', (done) => {
        try {
            setTimeout(() => {//Wait syncTimeAPI*1000 seconds
                let tmpTime = new Date().getTime();
                ApiReq.deleteInvoice(API_Env.get().headerSet,
                    {
                        "invoiceId": testData["invoiceId"],
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
                        done();
                    });
            }, 1000);
        } catch (e) {
            done(e);
        }
    });

});